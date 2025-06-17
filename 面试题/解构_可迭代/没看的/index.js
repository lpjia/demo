const wait = (dur) => {
  return new Promise((resolve) => {
    setTimeout(resolve, dur);
  });
}

const LogFactory = (level) => (...msg) => {
  const p = document.createElement("p");
  p.textContent = `${level}: ${msg}`;
  logContent.appendChild(p);
};

const log = LogFactory("log");
const error = LogFactory("error");

const format = (obj) => {
  if (obj === null) {
    return "null";
  }

  const type = typeof obj;
  if (type === "function") {
    return `function() {...}`;
  }

  if (type === "symbol") {
    return obj.toString();
  }

  if (type === "object") {
    if (Array.isArray(obj)) {
      return `[${obj.map(format).join(", ")}]`;
    }
    const keys = Reflect.ownKeys(obj);
    const content = keys
      .map((k) => {
        return `${format(k)}: ${format(obj[k])}`;
      })
      .join(", ");
    return `{ ${content} }`;
  }

  return `${obj}`;
};

const clearLog = () => {
  logContent.innerHTML = "";
};

const run = async (title, fn) => {
  log(`Running case: ${title}`);
  await wait(500);
  try {
    fn();
  } catch (e) {
    error(e.message);
  }
};

cases.forEach(([title, content], i) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.textContent = title;
  btn.onclick = () => {
    clearLog();
    run(title, () => {
      const res = (0, eval)(`(() => {${content}})()`);

      log(`${title} = ${format(res)}`);
    });
  };
  li.appendChild(btn);
  controls.appendChild(li);
});
