const NodeHelper = require("node_helper")
const Log = require("logger")

module.exports = NodeHelper.create({

  async socketNotificationReceived(notification, payload) {
    Log.log("notification received ", notification, " ", payload)
    if (notification === "GET_UPDATED_METAR") {
      const url = "https://aviationweather.gov/api/data/metar?ids=" + payload
      Log.info("Url is: ", url)
      const response = await fetch(url)
      if (!response.ok){
        Log.info("Failed to get METAR, Response status: ", response.status)
      }else{
        const metarText = await response.text()
        Log.info("Got Metar: ", metarText)
        this.sendSocketNotification("METAR_UPDATE", { text: metarText })
      }
    }
  },
})
