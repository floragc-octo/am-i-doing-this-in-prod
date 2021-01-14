# Didactic Barnacle - browser extension to display custom project environments

This extension display a ribbon on specific page in order to have a quick view of which environment you're in !

<img src="documentation/assets/example.png" height="250"/>

---

## What it does / What it needs to do

This extension allows to :

* Add an env from a specific page and customize
    * the url (to cut the unneeded parts),
    * the ribbon's background color
    * the label (max 10 characters)
* Add a default env and customize it
* Export your configuration in JSON format (to share with your team, maybe)
* Import a configuration 

This extension *lacks* :
* a full support of Firefox (it's a little bit broken, see Issues)

This extension will *soon* :
* let you customize the ribbon font color (in the meantime don't choose a too light background color as the font color is white)

This extension will *maybe one day* :
* let you customize the ribbon design

## Getting Started

The extension comes with a settings page accessible from the plugin options or by clicking on the plugin's icon on your
plugins' menu

<img src="documentation/assets/menu_extension_icon.png" height="250"/>

One you've installed the extension you can start to add pages/environment or import existing settings

### Customize/Add an environment

Once you're on the settings' page (see "Getting started")  you can click on "Add current page to env" or "Create a new env"

You can cut parts of the url as the extension only checks if the page's url contains the url specified.

For example,
> `testing.myapp.fr` will work for `www.backend.testing.myapp.fr`

Don't forget to hit the save button !


### Export Settings

<img src="documentation/assets/settings.png" height="250"/>


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

---

## Built With

Vanilla JS only :)

---

## Authors

* **Flora GC** [GitHub](https://github.com/floragc-octo/)

with the participation of
* **Simon Belbeoch** [GitHub](https://github.com/LiquidITGuy)

---

## Versioning

Not decided yet

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
