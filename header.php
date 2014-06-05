<!doctype html>
<html>
    <head>
        <title id="title_app_id" ></title>
        <meta http-equiv=Content-Type content="text/html; charset=utf-8" /> 
        <meta name="viewport" content="width=device-width" />
        <script>document.documentElement.className = 'js';</script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
        <meta http-equiv="X-UA-f" content="IE=edge,chrome=1">
        <link rel="stylesheet" href="./js/lib/jqueryui/css/cupertino/jquery-ui-1.10.4.custom.css" type="text/css">
        <!--link id="cssToApply" rel="stylesheet" type="text/css"-->
        
        
        <link  rel="stylesheet" type="text/css" href="./css/appli_caisse_pizza_structure.css">
        <link rel="stylesheet" type="text/css" href="./css/appli_caisse_pizza_personalize.css">
        
        <script type="text/javascript" src="./js/lib/jquery.js" ></script>
        <script type="text/javascript" src="./js/toolBox.js" ></script>  
        <script src="./js/crypt.js"></script>
        <script type="text/javascript" src="./js/templates.js"></script>
        <script>
            showLoading();
        </script>
        <script type="text/javascript" src="./js/scripts.js"></script>
        <script type="text/javascript" src="./js/strings.js" ></script>
        <script type="text/javascript" src="./js/config.js"  ></script>
        <script type="text/javascript" src="./js/bean.js" defer></script>
        <script type="text/javascript" src="./js/lib/jqueryui/js/jquery-ui-1.10.4.custom.js" defer></script>
        <script type="text/javascript" src="./js/bean.js" defer></script>
        <script type="text/javascript" src="./js/bean.js" defer></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAcces.js"></script>
        <script type="text/javascript" src="./js/findInLoaded.js" defer ></script>
        <script type="text/javascript" src="./js/ConnexionFactory.js" defer ></script>
        <script type="text/javascript" src="./js/connexionServer.js" defer ></script>
        <script type="text/javascript" src="./js/database/indexedDB/ConnexionLocalIndexedDB.js" defer ></script>
        <script type="text/javascript" src="./js/database/webSQL/ConnexionLocalWebSQL.js" defer ></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesMenu.js" defer ></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesPendingDatas.js" defer ></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesEntreprise.js" defer ></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesEntrepriseMaj.js" defer ></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesSousCategorie.js" defer ></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesModeDeReglement.js" defer ></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesProduit.js" defer></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesTables.js" defer></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesCategorie.js" defer></script>
        <script type="text/javascript" src="./js/database/indexedDB/indexedDBAccesIngredient.js" defer></script>  
        <script type="text/javascript" defer >
            function init() {
                if (isIndexedDBSupported()) {
                    myStorage.indexedDB.create(); // open displays the data previously saved
                }
                $.getScript("./js/control.js");
            }
            window.addEventListener("DOMContentLoaded", init, false);
        </script>
    </head>
    <body>
        <div id="header_id" class="header header_structure header_personalize">
            <div id="header_left_id" class="header_left header_left_structure header_left_personalize">
                <div id="header_left_logo_id" class="header_left_logo header_left_logo_structure header_left_logo_personalize  header_text_bottom header_text_bottom_structure header_text_bottom_personalize">
                    <img id="logo_header"  class="logo_header logo_header_structure logo_header_personalize">
                    <p id="header_left_logo_message_id" class="header_left_logo_message header_left_logo_message_structure header_left_logo_message_personalize"></p>
                </div>
            </div>
            <!--<div id="header_left_id2" class="header_left"></div>-->
            <div id="header_right_id" class="header_right header_right_structure header_right_personalize">
                <div id="header_right_logo_id" class="header_right_logo header_right_logo_structure header_right_logo_personalize header_text_bottom header_text_bottom_structure header_text_bottom_personalize">
                    <div style="margin-right: 0px;" id="header_right_isconnced_id" class="header_right_isconnced header_right_isconnced_structure header_right_isconnced_personalize"></div>
                    <p id="header_right_logo_slogan" class="header_right_logo_slogan header_right_logo_slogan_structure header_right_logo_slogan_personalize"></p>
                </div>
            </div>
        </div>



        