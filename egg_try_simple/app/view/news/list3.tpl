<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
      <li class="item">
        <a href="{{ item.url }}">{{ item.title }}</a>
        <span style="color:red;">{{ helper.relativeTime(item.time) }}</span>
      </li>
      {% endfor %}
    </ul>
  </body>
</html>