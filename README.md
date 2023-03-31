# Am I doing this in Prod ?

Have you ever come close to create a silly product on production while thinking you were on your testing tab ?

This extension display a ribbon on specific pages in order to have a quick view of which environment you're in !

<img src="documentation/assets/example.png" height="250"/>

Download in `Chrome web store` : [Am I doing this in Prod ?](https://chrome.google.com/webstore/detail/am-i-doing-this-in-prod/aoglejgecidnodkkogbgieidhmhjjnch) 

Download for `Firefox` _(not 100% supported yet, see below)_ : [Am I doing this in Prod ? (experimental)](https://addons.mozilla.org/en-CA/firefox/addon/am-i-doing-this-in-prod/)


---

## What does it do

This extension allows to :

* Add an env from a specific page and customize the : 
    * URL,
    * Ribbon's background color
    * Label (max 10 characters)
* Add a default env and customize it
* Export your configuration in JSON format (to share with your team, maybe)
* Import a configuration 

This extension *lacks* :
* a full support of Firefox (it's a little bit broken, see Issues)

## Getting Started

The settings page is accessible from the plugin options or by clicking on the plugin's icon on your
plugins' menu (the left one on the screenshot below)

(devnote: accessing the settings and changing colors from the icon's setting may be troublesome in Firefox)

<img src="documentation/assets/menu_extension_icon.png" height="35"/>

Once you have installed the extension you can start to add pages/environment or import existing settings

<img src="documentation/assets/settings.png" height="400"/>

### Customize/Add an environment

Once you're on the settings' page (see "Getting started")  you can click on "Add current page to env" or "Create a new env"

You can cut parts of the url as the extension only checks if the page's url contains the url specified.

For example,
> `testing.myapp` will work for `www.backend.testing.myapp.fr`

Don't forget to hit the save button !


### Export Settings

You'll get a json file with your settings.

### Import Settings

Usually you'll get an file to import by previously exporting settings.



If you need to know the structure, it may look like this :

```
[
    {
        "site": "myurl.fr",
        "label": "PROD",
        "color": "#7c6a6a"
    },
    {
        "site": "my_other_url.fr",
        "label": "TESTING",
        "color": "#7585ff"
    }
]
```

### one click import for your project
If you want to import easily the configuration for all your project you can use event for all user who already installed the extension.
Only one people have to configure the extension then you can export the file and emit an `am_i_doing_this_in_prod_custom_event_import` on document.
it may be like : 
```javascript
const exportedConfig = [{"site":"https://dashboard.scalingo.com/apps/osc-fr1/project-dev","label":"DEV","color":"#cccccc","id":"a0"},{"site":"https://dashboard.scalingo.com/apps/osc-fr1/project-qua","label":"QUA","color":"#00ff4c","id":"a1"},{"site":"https://dashboard.scalingo.com/apps/osc-fr1/project-prod","label":"PROD","color":"#ff0000","id":"a2"}]
const importConfig = document.dispatchEvent(new CustomEvent('am_i_doing_this_in_prod_custom_event_import'), { detail: exportedConfig })
```
````html
<button onclick="importConfig">Importer les environnements</button>
````

---

## Built With

Vanilla JS only

---

## Authors

* **Flora GC** [GitHub](https://github.com/floragc-octo/)

with the participation of
* **Simon Belbeoch** [GitHub](https://github.com/LiquidITGuy)

---

## Versioning

Work in Progress

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
