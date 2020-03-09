export const mobileTemplate: string = `
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
  <script>
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }
    if(!window.Promise) {
      document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
    }
  </script>
  <link rel="stylesheet" href="https://cdn.bootcss.com/antd-mobile/2.3.1/antd-mobile.min.css">
</head>
<body>
<div id="root" />
<script src="https://cdn.bootcss.com/react/16.10.1/umd/react.production.min.js"></script>
<script src="https://cdn.bootcss.com/react-dom/16.10.1/umd/react-dom.production.min.js"></script>
<script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script>
<script src="https://cdn.bootcss.com/antd-mobile/2.3.1/antd-mobile.min.js"></script>
<script>
  window.serverPath = "<%= serverPath %>";
  window.schema = <%- schema %>;
</script>
<script>
  window.isDemo = <%- isDemo %>
</script>
<script src="<%= mobile %>"></script>
</body>
</html>
`;
