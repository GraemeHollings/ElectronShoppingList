const electron = require('electron');
const url = require('url');
const path = require('path');

//Bringing everything in from Electron
const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function()
{
    //Create new window
    mainWindow = new BrowserWindow({});
    //Load HTML file into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    })); //file://dirname//mainWindow.html

    //Build Menu from template
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    //Insert the menu
    Menu.setApplicationMenu(mainMenu)
});


//Handle creating a new item window
function createAddWindow()
{
    //Create new window
    addWindow = new BrowserWindow({

        width: 400,
        height: 300,
        title: 'Add Shopping List Item'

    });

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
}
//Create a menu template
const menuTemplate = [
    {
        label: 'File',
        submenu: 
        [
            {
                label: 'Add Item',
                click()
                {
                    createAddWindow();
                }

            },
            {
                label: 'Clear Items'

            },
            {

                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 
                'CTRL+Q',
                click()
                {
                    app.quit();
                }
            }
        ]

    }
];