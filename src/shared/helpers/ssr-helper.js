const App = require("../../../dist/app");

function getHtml({ uri = "/" } = { uri: "/" }) {
  const event = {
    Records: [
      {
        cf: {
          request: {
            uri,
          },
        },
      },
    ],
  };

  return new Promise((resolve) => {
    App.handler(event, null, (error, response) => {
      resolve(response.body);
    });
  });
}

export default {
  getHtml,
};
