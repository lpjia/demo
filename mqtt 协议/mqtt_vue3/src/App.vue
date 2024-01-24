<template>
  <div class="mqtt-demo">
    <el-card>
      <h1>Configuration</h1>
      <el-form label-position="top" :model="connection">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="protocol" label="Protocol">
              <el-select v-model="connection.protocol" @change="handleProtocolChange">
                <el-option label="ws://" value="ws"></el-option>
                <el-option label="wss://" value="wss"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="host" label="Host">
              <el-input v-model="connection.host"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="port" label="Port">
              <el-input v-model.number="connection.port" type="number" placeholder="8083/8084"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="clientId" label="Client ID">
              <el-input v-model="connection.clientId"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="username" label="Username">
              <el-input v-model="connection.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="password" label="Password">
              <el-input v-model="connection.password"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-button type="primary" :disabled="client.connected" @click="createConnection"
              :loading="btnLoadingType === 'connect'">
              {{ client.connected ? "Connected" : "Connect" }}
            </el-button>

            <el-button v-if="client.connected" type="danger" @click="destroyConnection"
              :loading="btnLoadingType === 'disconnect'">
              Disconnect
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <h1>Subscribe</h1>
      <el-form label-position="top" :model="subscription">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic">
              <el-input v-model="subscription.topic" :disabled="subscribedSuccess"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS">
              <el-select v-model="subscription.qos" :disabled="subscribedSuccess">
                <el-option v-for="qos in qosList" :key="qos" :label="qos" :value="qos"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" class="sub-btn" :loading="btnLoadingType === 'subscribe'"
              :disabled="!client.connected || subscribedSuccess" @click="doSubscribe">
              {{ subscribedSuccess ? "Subscribed" : "Subscribe" }}
            </el-button>
            <el-button v-if="subscribedSuccess" type="primary" class="sub-btn" :loading="btnLoadingType === 'unsubscribe'"
              :disabled="!client.connected" @click="doUnSubscribe">
              Unsubscribe
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card>
      <h1>Publish</h1>
      <el-form label-position="top" :model="publish">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item prop="topic" label="Topic">
              <el-input v-model="publish.topic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="payload" label="Payload">
              <el-input v-model="publish.payload"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="qos" label="QoS">
              <el-select v-model="publish.qos">
                <el-option v-for="qos in qosList" :key="qos" :label="qos" :value="qos"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-col :span="24" class="text-right">
        <el-button type="primary" :loading="btnLoadingType === 'publish'" :disabled="!client.connected"
          @click="doPublish">
          Publish
        </el-button>
      </el-col>
    </el-card>
    <el-card>
      <h1>Receive</h1>
      <el-col :span="24">
        <el-input type="textarea" :rows="3" v-model="receivedMessages" readonly></el-input>
      </el-col>
    </el-card>
  </div>
</template>

<script setup>
import mqtt from "/node_modules/mqtt/dist/mqtt.esm.js";
import { reactive, ref } from "vue";

const qosList = [0, 1, 2];
const connection = reactive({
  // ws or wss
  protocol: "ws",
  host: "broker-cn.emqx.io",
  // ws -> 8083; wss -> 8084
  port: 8083,
  clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
  username: 'emqx',
  password: 'public',
  clean: true,
  connectTimeout: 30 * 1000, // ms
  reconnectPeriod: 4000, // ms
});
const subscription = ref({
  topic: "/nodejs/mqtt",
  qos: 0,
});
const publish = ref({
  topic: "/nodejs/mqtt",
  qos: 0,
  // payload: '{ "msg": "Hello, I am browser." }',
  payload: 'vue3',
});
let client = ref({
  connected: false,
});
const receivedMessages = ref("");
const subscribedSuccess = ref(false);
const btnLoadingType = ref("");
const retryTimes = ref(0);
const initData = () => {
  client.value = {
    connected: false,
  };
  retryTimes.value = 0;
  btnLoadingType.value = "";
  subscribedSuccess.value = false;
};
const handleOnReConnect = () => {
  retryTimes.value += 1;
  if (retryTimes.value > 5) {
    try {
      client.value.end();
      initData();
      console.log("connection maxReconnectTimes limit, stop retry");
    } catch (error) {
      console.log("handleOnReConnect catch error:", error);
    }
  }
};
const createConnection = () => {
  try {
    btnLoadingType.value = "connect";
    const { protocol, host, port, ...options } = connection;
    const connectUrl = `${protocol}://${host}:${port}/mqtt`;

    client.value = mqtt.connect(connectUrl, options);

    if (client.value.on) {
      client.value.on("connect", () => {
        btnLoadingType.value = "";
        console.log("connection successful");
      });

      client.value.on("reconnect", handleOnReConnect);

      client.value.on("error", (error) => {
        console.log("connection error:", error);
      });

      client.value.on("message", (topic, message) => {
        receivedMessages.value = receivedMessages.value.concat(
          message.toString()
        );
        console.log(`received message: ${message} from topic: ${topic}`);
      });
    }
  } catch (error) {
    btnLoadingType.value = "";
    console.log("mqtt.connect error:", error);
  }
};
const doSubscribe = () => {
  btnLoadingType.value = "subscribe";
  const { topic, qos } = subscription.value;
  client.value.subscribe(
    topic,
    { qos },
    (error, granted) => {
      btnLoadingType.value = "";
      if (error) {
        console.log("subscribe error:", error);
        return;
      }
      subscribedSuccess.value = true;
      console.log("subscribe successfully:", granted);
    }
  );
};
const doUnSubscribe = () => {
  btnLoadingType.value = "unsubscribe";
  const { topic, qos } = subscription.value;
  client.value.unsubscribe(topic, { qos }, (error) => {
    btnLoadingType.value = "";
    subscribedSuccess.value = false;
    if (error) {
      console.log("unsubscribe error:", error);
      return;
    }
    console.log(`unsubscribed topic: ${topic}`);
  });
};
const doPublish = () => {
  btnLoadingType.value = "publish";
  const { topic, qos, payload } = publish.value;
  client.value.publish(topic, payload, { qos }, (error) => {
    btnLoadingType.value = "";
    if (error) {
      console.log("publish error:", error);
      return;
    }
    console.log(`published message: ${payload}`);
  });
};
const destroyConnection = () => {
  if (client.value.connected) {
    btnLoadingType.value = "disconnect";
    try {
      client.value.end(false, () => {
        initData();
        console.log("disconnected successfully");
      });
    } catch (error) {
      btnLoadingType.value = "";
      console.log("disconnect error:", error);
    }
  }
};
const handleProtocolChange = (value) => {
  connection.port = value === "wss" ? 8084 : 8083;
};
</script>

<style>
.mqtt-demo {
  max-width: 1200px;
  margin: 32px auto 0 auto;
}

h1 {
  font-size: 16px;
  margin-top: 0;
}

.el-card {
  margin-bottom: 32px;
}

.el-card__body {
  padding: 24px;
}

.el-select {
  width: 100%;
}

.text-right {
  text-align: right;
}

.sub-btn {
  margin-top: 30px;
}
</style>
