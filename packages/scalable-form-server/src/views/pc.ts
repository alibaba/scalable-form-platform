export const pcTemplate: string = `
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdn.bootcss.com/antd/3.23.6/antd.min.css">
</head>
<body>
<div id="root" />
<script src="https://cdn.bootcss.com/react/16.10.1/umd/react.production.min.js"></script>
<script src="https://cdn.bootcss.com/react-dom/16.10.1/umd/react-dom.production.min.js"></script>
<script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script>
<script src="https://cdn.bootcss.com/antd/3.23.6/antd.min.js"></script>
<script>
  window.serverPath = "<%= serverPath %>";
  window.schema = <%- schema %>;
</script>
<script>
  window.isDemo = <%- isDemo %>
</script>
<script src="<%= portal %>"></script>
</body>
</html>
`;
