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
    mainWindow = new BrowserWindow({

        webPreferences: {
            nodeIntegration: true
        }
    });
    //Load HTML file into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    })); //file://dirname//mainWindow.html
    
    //Quit app once the main window is closed.
    mainWindow.on('closed', function()
    {
        app.quit();
    });


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
        title: 'Add Shopping List Item',
        webPreferences: {
            nodeIntegration: true
        }
    });

    //Load the add window html file.
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    //Garbage Collection handle, nulls out addWindow once it is closed.
    addWindow.on('close', function(){
        addWindow = null
    });

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

//Add devloper tools item if not in production
if(process.env.NODE_ENV !== 'production')
{
    menuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 
                'CTRL+I',
                click(item, FocusedWindow)
                {
                    FocusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'


            }
        ]
    });

}