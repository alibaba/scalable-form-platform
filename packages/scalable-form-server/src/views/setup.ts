export const setupTemplate: string = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>xForm系统初始化配置</title>
  <link rel="stylesheet" href="https://cdn.bootcss.com/antd/3.23.6/antd.min.css">
</head>
<body>
<div id="root" />
<script src="https://cdn.bootcss.com/react/16.10.1/umd/react.production.min.js"></script>
<script src="https://cdn.bootcss.com/react-dom/16.10.1/umd/react-dom.production.min.js"></script>
<script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script>
<script src="https://cdn.bootcss.com/antd/3.23.6/antd.min.js"></script>
<script>
  window.isDemo = <%- isDemo %>
</script>
<script>
  window.serverPath = "<%= serverPath %>";
  window.initStatusCode="<%- initStatusCode %>";
</script>
<script>
  window.tableStatus=<%- tableStatus %>;
</script>
<script>
  window.schemaTableSQL=\`<%- schemaTableSQL %>\`;
</script>
<script>
  window.dataTableSQL=\`<%- dataTableSQL %>\`;
</script>
<script>
  window.db="<%- db %>";
</script>
<script src="<%= setup %>"></script>
</body>
</html>
`;
