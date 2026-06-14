Module.register("MMM-Metar", {

  defaults: {
    airport: "KCID",
    fetchInterval: 60 * 15 * 1000, // 15 minutes in ms
    exampleContent: "No METAR LOADED",
  },

  /**
   * Apply the default styles.
   */
  getStyles() {
    return ["metar.css"]
  },

  /**
   * Pseudo-constructor for our module. Initialize stuff here.
   */
  start() {
    Log.info("in MMM-Metar start()")
    this.metarContent = this.config.exampleContent

    // set timeout for next random text
    setInterval(() => this.getUpdatedMetar(), this.config.fetchInterval)

    // do an initial load...
    this.getUpdatedMetar()
  },

  /**
   * Handle notifications received by the node helper.
   * So we can communicate between the node helper and the module.
   *
   * @param {string} notification - The notification identifier.
   * @param {any} payload - The payload data`returned by the node helper.
   */
  socketNotificationReceived: function (notification, payload) {
    Log.log("notification received ", notification, " ", payload)
    if (notification === "METAR_UPDATE") {
      this.metarContent = `${payload.text}`
      this.updateDom()
    }
  },

  /**
   * Render the page we're on.
   */
  getDom() {
    const wrapper = document.createElement("div")
    wrapper.innerHTML = `${this.metarContent}`

    return wrapper
  },

  getUpdatedMetar() {
    Log.log("sending SocketNotification")
    this.sendSocketNotification("GET_UPDATED_METAR", this.config.airport)
  },

  /**
   * This is the place to receive notifications from other modules or the system.
   *
   * @param {string} notification The notification ID, it is preferred that it prefixes your module name
   * @param {number} payload the payload type.
   */
  notificationReceived(notification, payload) {
    // Stub function not implemented
  }
})
