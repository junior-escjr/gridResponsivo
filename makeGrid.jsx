	
		

// 1280 : 12 : 81 : 28 : 0
// makeGrid v.1.0
// Thor Sarup - 2011

// enable double clicking from the Macintosh Finder or the Windows Explorer
#target photoshop

// in case we double clicked the file
app.bringToFront();

/*  Guides from GRIDCALCULATOR.dk */
var gridGuides = [0, 0, 81, 109, 190, 218, 299, 327, 408, 436, 517, 545, 626, 654, 735, 763, 844, 872, 953, 981, 1062, 1090, 1171, 1199, 1280, 1280];
var newDocGutter = 0;

/* max and min of gridGuides array */   
var gridMin = Math.min.apply(null, gridGuides);
var gridMax = Math.max.apply(null, gridGuides);

/* run it! */
main();

function main() {
    if (app.documents.length > 0) { // documents open
        var dlg = new Window('dialog', 'GridCalculator.dk', [100,100,370,270]);
        
        dlg.textLabel = dlg.add('statictext', [5,5,200,69], 'Add grid to current document?');
        dlg.yesButton = dlg.add('button', [10,130,50,160], 'Yes');
        dlg.noButton = dlg.add('button', [60,130,160,160], 'No, create new');
        dlg.cancelButton = dlg.add('button', [170,130,260,160], 'Cancel');        
        
         /* Yes button (current doc) */
        dlg.yesButton.onClick = function yesClick() {
            makeGrid();
            dlg.close();
        }
        /* No button (new doc) */
        dlg.noButton.onClick = function noClick() {
            createNewDoc();
            makeGrid();
            dlg.close();
        }
        
         /* cancel button  = close dialog */
        dlg.cancelButton.onClick = function cancelClick() {
            dlg.close();
        }
    
        /* show the dialog */
        dlg.show();
        
   } else { // no documents open
       createNewDoc();
       makeGrid();         
   }
}

function createNewDoc() {
    app.preferences.rulerUnits = Units.PIXELS;
    var newDocumentRef = app.documents.add(gridMax-gridMin+newDocGutter*2, 768, 72.0000, "Document with grid");
    newDocumentRef = null;
    
    for(i=0; i < gridGuides.length; i++) {
        gridGuides[i] += newDocGutter;
    }
    
}

/* function loops through the array holdin the grid guides */
function makeGrid() {
    for(i=0; i < gridGuides.length; i++) {
        makeGuide(gridGuides[i],"Vrtc");
    }
}

// function found on Adobe's blog post: http://blogs.adobe.com/crawlspace/2006/05/installing_and_1.html
function makeGuide(pixelOffSet, orientation) {
    var id8 = charIDToTypeID( "Mk  " );
    var desc4 = new ActionDescriptor();
    var id9 = charIDToTypeID( "Nw  " );
    var desc5 = new ActionDescriptor();
    var id10 = charIDToTypeID( "Pstn" );
    var id11 = charIDToTypeID( "#Rlt" );
    desc5.putUnitDouble( id10, id11, pixelOffSet ); // integer
    var id12 = charIDToTypeID( "Ornt" );
    var id13 = charIDToTypeID( "Ornt" );
    var id14 = charIDToTypeID( orientation ); // "Vrtc", "Hrzn"
    desc5.putEnumerated( id12, id13, id14 );
    var id15 = charIDToTypeID( "Gd  " );
    desc4.putObject( id9, id15, desc5 );
    executeAction( id8, desc4, DialogModes.NO );
}
