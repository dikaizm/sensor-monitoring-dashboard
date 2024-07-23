#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <Servo.h>
#include <ArduinoJson.h>

const char* ssid = "Galaxy A54 5G 94C9";  // Ganti dengan SSID Wi-Fi Anda
const char* password = "00000001";        // Ganti dengan password Wi-Fi Anda
const char* statusUrl = "http://sensor-monitoring.stelarhub.my.id/api/sensor/conveyor/status?type=plc";

ESP8266WebServer server(80);
Servo myservo;
int servoPin = D4;   // Pin yang digunakan untuk mengontrol servo
int initialPos = 0;  // Posisi awal servo
int onPos = 90;      // Posisi "on" servo
bool isOn = false;

WiFiClient wifiClient;

unsigned long previousMillis = 0;
const long interval = 3000;  // check status every 3 seconds

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  // Coba koneksi ke Wi-Fi
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Setup server routes
  server.on("/", handleRoot);
  server.on("/move", handleMoveServo);
  server.on("/status", handleStatus);

  server.begin();
  Serial.println("HTTP server started");

  myservo.attach(servoPin);   // Hubungkan servo ke pin yang ditentukan
  myservo.write(initialPos);  // Atur servo ke posisi awal
}

void loop() {
  server.handleClient();

  // unsigned long currentMillis = millis();
  // if (currentMillis - previousMillis >= interval) {
  //   previousMillis = currentMillis;
  //   checkStatusFromServer();
  // }
}

void handleRoot() {
  server.send(200, "text/plain", "Use /move to move the servo to on position and then back to initial position\nUse /status to know the current state of the switch");
}

void handleMoveServo() {
  myservo.write(onPos);       // Gerakkan servo ke posisi "on"
  delay(1000);                // Tahan posisi "on" selama 1 detik
  myservo.write(initialPos);  // Kembalikan servo ke posisi awal
  isOn = !isOn;
  String message = isOn ? "ON" : "OFF";
  server.send(200, "text/plain", message);
}

void handleStatus() {
  String message = isOn ? "ON" : "OFF";
  server.send(200, "text/plain", message);
}

void checkStatusFromServer() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(wifiClient, statusUrl);      // Specify the URL
    int httpCode = http.GET();  // Make the request

    if (httpCode > 0) {  // Check for the returning code
      String payload = http.getString();
      Serial.println(httpCode);
      Serial.println(payload);

      StaticJsonDocument<300> doc;  // Adjust size if necessary
      DeserializationError error = deserializeJson(doc, payload);

      if (error) {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return;
      }

      // Extract values from the JSON document
      bool status = doc["data"]["status"];
      Serial.print("Status: ");
      Serial.println(status ? "active" : "inactive");

      if (status != isOn) {         // If status is false (inactive)
        myservo.write(onPos);       // Gerakkan servo ke posisi "on"
        delay(1000);                // Tahan posisi "on" selama 1 detik
        myservo.write(initialPos);  // Kembalikan servo ke posisi awal
        isOn = status;
      }
    } else {
      Serial.println("Error on HTTP request");
    }
    http.end();  // Free the resources
  } else {
    Serial.println("WiFi not connected");
  }
}