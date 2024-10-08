export const responseHTML = `
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #333;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    header {
      background-color: #282c34;
      color: #fff;
      padding: 2rem 0;
      text-align: center;
    }
    .content-wrapper {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content {
      max-width: 600px;
      padding: 2rem;
      text-align: center;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    a {
      color: #61dafb;
      text-decoration: none;
    }
    .footer {
      background-color: #282c34;
      padding: 1rem 0;
      text-align: center;
      font-size: 0.8rem;
      color: #ccc;
    }
  </style>
</head>
<body>
  <header>
    <h1>Trainee app API Documentation</h1>
    <p>Your Simple Guide to Integration</p>
  </header>
  <div class="content-wrapper">
    <div class="content">
      <h2>Explore the API</h2>
      <p>Welcome to the official documentation for the Trainee app API. Discover endpoints, parameters, and responses in a streamlined format.</p>
      <p>Whether you're an expert or a beginner, our documentation provides what you need to integrate the API smoothly.</p>
      <h2>Getting Started</h2>
      <p>If you're new, head to the <a href="/api-docs">Getting Started</a> section for a quick introduction to authentication and making requests.</p>
    </div>
  </div>
  <footer class="footer">
    <p> All rights reserved.</p>
  </footer>
</body>
</html>
`
