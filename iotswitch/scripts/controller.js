$(document).ready(function() {
    $("button").attr("disabled", true);
    let address = "wss://test.mosquitto.org:8081/mqtt";
    client = mqtt.connect(address)
    client.on("connect", function() {
        $("#btnOn").attr("disabled", false)
    });

    $("#btnOn").click(function() {
        let dateon = new Date()
        let date = dateon.toLocaleDateString()
        let time = dateon.toLocaleTimeString()
        client.publish("redgie/device/status", "Turned On: " + date + " " + time);
        $("#btnOff").attr("disabled", false);
        $("#btnOn").attr("disabled", true);
        $("#status").text("The devices is currently turned on")
        $("#status").css("color", "green")
    })

    $("#btnOff").click(function() {
        let dateon = new Date()
        let date = dateon.toLocaleDateString()
        let time = dateon.toLocaleTimeString()
        client.publish("redgie/device/status", "Turned Off: " + date + " " + time);
        $("#btnOff").attr("disabled", true);
        $("#btnOn").attr("disabled", false);
        $("#status").text("The devices is currently turned off")
        $("#status").css("color", "red")
    })
});