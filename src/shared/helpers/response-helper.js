const STATUS_DESCRIPTION_200 = "OK";
const STATUS_DESCRIPTION_301 = "Moved Permanently";
const STATUS_DESCRIPTION_404 = "Not Found";
const STATUS_DESCRIPTION_500 = "Internal Server Error";

const STATUS_VALUE_200 = "200";
const STATUS_VALUE_301 = "301";
const STATUS_VALUE_404 = "404";
const STATUS_VALUE_500 = "500";

function httpCodeToStatusDescription({ httpCode = "" } = { httpCode: "" }) {
  switch (httpCode.toString()) {
    case STATUS_VALUE_200: {
      return STATUS_DESCRIPTION_200;
    }
    case STATUS_VALUE_301: {
      return STATUS_DESCRIPTION_301;
    }
    case STATUS_VALUE_404: {
      return STATUS_DESCRIPTION_404;
    }
    case STATUS_VALUE_500: {
      return STATUS_DESCRIPTION_500;
    }
    default: {
      return "";
    }
  }
}

module.exports = {
  Constants: {
    STATUS_VALUE_200,
    STATUS_VALUE_301,
    STATUS_VALUE_404,
    STATUS_VALUE_500,
  },
  httpCodeToStatusDescription,
};
