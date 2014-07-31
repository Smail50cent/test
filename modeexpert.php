<html><!-- @author Damien Chesneau <contact@damienchesneau.fr>-->
    <head>
        <title id="title_app_id" ></title>
        <meta http-equiv=Content-Type content="text/html; charset=utf-8" /> 
        <meta name="viewport" content="width=device-width" />
        <script>document.documentElement.className = 'js';</script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
        <meta http-equiv="X-UA-f" content="IE=edge,chrome=1">
        <script type="text/javascript" src="./js/lib/jquery.js" defer ></script>
        <script type="text/javascript" src="./js/scripts.js" defer></script>
        <link  rel="stylesheet" type="text/css" href="./css/mode_expert.css">
    </head>
    <body>
        <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Mode expert</a>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a onclick="goGestionApplication();">Mode simple</a></li>
                        <li><a href="#">Votre compte</a></li>
                        <li><a onclick="deconexion();">Déconnexion</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <br><br><br>
            <div class="row">
                <div class="col-sm-2 col-md-2 sidebar">
                    <ul id="nav_menu_right_ul_detail_id" class="nav nav-pills nav-stacked">
                    </ul>
                </div>
                <div id="new_container">
                    
                </div>
                
            </div>
        </div>
    </body>
</html> 
