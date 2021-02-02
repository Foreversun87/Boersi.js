# ToDo's
* [x] LoginPage: 07.01.2021
    * Differenzierte Fehlerbehandlung, siehe: 
```js
     State.error = useLogin();
```
* LoginContext
    * useEffect überprüfen, ob reset auch ohne die Funktion funktioniert

# 23.12.2020
## Verbesserungen:
* url in config-Datei auslagern, z.B auch Links
* Globale Function für Backendresponse.status
    * Codebeispiel von Mathias::

```js
function httpGet(self, url, config, cb1, cb2){
        axios.get(url,config).then(ok => {
            if(cb1){
                cb1(self, ok);
            }
        })
        .catch(err => {
            httpError(self, err, cb2)
        })  
    }
```

* Validierung
* VR-Networld: [Link](https://www.vr-dienste.de/zahlungsverkehr/vr-networld-software/)

# Januar Stammtisch
## 30.12.2020 für Matthias:
* Wie am Besten die Expetions schmeißen?
    * In Backendabfrage oder eine Ebene darüber
    * Siehe ModalStrategieTrade(Ebene darüber) und StrategieTradeContext
        * [ModalStrategieTrade](file:///C:/Users/Ratte/Desktop.I/VSC/B%C3%B6rsi/frontend/src/components/modal/strategieTrade/ModalStrategieTrade.jsx)
        * [StrategieTradeContext](file:///C:/Users/Ratte/Desktop.I/VSC/B%C3%B6rsi/frontend/src/components/modal/strategieTrade/ModalStrategieTrade.jsx)

## React-Query
Siehe dazu [bitte](#23.12.2020). Mögliche Lösung, welche mir Matthias eine ```Function ``` empfohlen hat.

* [react-query](https://github.com/tannerlinsley/react-query)