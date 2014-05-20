function Entreprise() {
    this.nom;
    this.adresse;
    this.logo;
    this.theme;
    this.telephone;
    this.slogan;
    this.message;
    this.langue;
    this.use_comptes;
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.setMessage = function(message) {
        this.message = message;
    };

    this.getMessage = function() {
        return this.message;
    };
    this.setAdresse = function(adresse) {
        this.adresse = adresse;
    };
    this.setLogo = function(logo) {
        this.logo = logo;
    };
    this.setTheme = function(theme) {
        this.theme = theme;
    };
    this.setSlogan = function(slogan) {
        this.slogan = slogan;
    };

    this.getSlogan = function() {
        return this.slogan;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.getAdresse = function() {
        return this.adresse;
    };
    this.getLogo = function() {
        return this.logo;
    };
    this.getTheme = function() {
        return this.theme;
    };
    this.setTelephone = function(telephone) {
        this.telephone = telephone;
    };

    this.getTelephone = function() {
        return this.telephone;
    };
    this.setUseComptes = function(use_comptes) {
        this.use_comptes = use_comptes;
    };

    this.getUseComptes = function() {
        return this.use_comptes;
    };
}

function Categorie() {
    this.id;
    this.nom;
    this.priorite;
    this.souscategorie; //array id souscategorie
    this.setId = function(id) {
        this.id = id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.getId = function() {
        return this.id;
    };
    this.setPriorite = function(priorite) {
        this.priorite = priorite;
    };
    this.getPriorite = function() {
        return this.priorite;
    };
    this.setSousCategorie = function(souscategorie) {
        this.souscategorie = souscategorie;
    };
    this.getSousCategorie = function() {
        return this.souscategorie;
    };
}
function SousCategorie() {
    this.id;
    this.categorie;
    this.nom;
    this.priorite;
    this.setId = function(id) {
        this.id = id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.setCategorie = function(categorie) {
        this.categorie = categorie;
    };
    this.getCategorie = function() {
        return this.categorie;
    };
    this.getId = function() {
        return this.id;
    };
    this.setPriorite = function(priorite) {
        this.priorite = priorite;
    };
    this.getPriorite = function() {
        return this.priorite;
    };
}
function Ingredient() {
    this.id;
    this.nom;
    this.setId = function(id) {
        this.id = id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.getId = function() {
        return this.id;
    };
}
;
function Produit() {
    this.id;
    this.nom;
    this.prix;
    this.id_categorie;
    this.id_sousCategorie;
    this.ids_ingredients; // ARRAY
    this.demanderCuisson = false;//BOOL
    this.options;
    this.Produit = function(id, nom, categorie, ingredients) {
        this.setCategorie(categorie);
        this.setId(id);
        this.setNom(nom);
        this.setIdsIngredients(ingredients);
    };
    this.setId = function(id) {
        this.id = id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.setPrix = function(prix) {
        this.prix = prix;
    };
    this.getPrix = function() {
        return this.prix;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.getOptions = function() {
        return this.options;
    };
    this.setOptions = function(options) {
        this.options = options;
    };
    this.getId = function() {
        return this.id;
    };
    this.getDemanderCuisson = function() {
        return this.demanderCuisson;
    };
    this.setDemanderCuisson = function(cuisson) {
        this.demanderCuisson = cuisson;
    };
    this.setIdsIngredients = function(idsIngredients) {
        this.ids_ingredients = idsIngredients;
    };
    this.getSousCategorie = function() {
        return this.id_sousCategorie;
    };
    this.setSousCategorie = function(id_sousCategorie) {
        this.id_sousCategorie = id_sousCategorie;
    };
    this.getIdsIngredients = function() {
        return this.ids_ingredients;
    };
    this.setCategorie = function(categorie) {
        this.id_categorie = categorie;
    };
    this.getCategorie = function() {
        return this.id_categorie;
    };
}
;
function Menu(id, produits, prix, nom) {
    this.id = id;
    this.nom = nom;
    this.produits = produits; //ARRAY
    this.prix = prix;
    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function(id) {
        return  this.id;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getNom = function() {
        return  this.nom;
    };
    this.setProduits = function(produits) {
        this.produits = produits;
    };
    this.setPrix = function(prix) {
        this.prix = prix;
    };
    this.getPrix = function() {
        return this.prix;
    };
    this.getProduits = function() {
        return this.produits;
    };
}
;
function QuantityOfProduct(id, product, quantity) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.personne;
    this.setId = function(id) {
        this.id = id;
    };
    this.getId = function() {
        return this.id;
    };
    this.setProduit = function(product) {
        this.product = product;
    };
    this.getProduit = function() {
        return this.product;
    };
    this.setQuantity = function(quantity) {
        this.quantity = quantity;
    };
    this.getQuantity = function() {
        return this.quantity;
    };
    this.setPersonne = function(personne) {
        this.personne = personne;
    };
    this.getPersonne = function() {
        return this.personne;
    };
}

function Ticket(id, quantityOfProducts) {
    this.id = id;
    this.quantityOfProducts = quantityOfProducts;
    this.total;
    this.table;
    this.type_commande;
    this.setId = function(id) {
        this.id = id;
    };
    this.setQuantityOfProduct = function(quantityOfProduct) {
        this.quantityOfProducts = quantityOfProduct;
    };
    this.setNewQuantityOfProduct = function(quantityOfProduct) {
        this.quantityOfProducts.push(quantityOfProduct);
    };
    this.getId = function() {
        return this.id;
    };
    this.getQuantityOfProduct = function() {
        return this.quantityOfProducts;
    };
    this.getIndexOfQuantityOfProductById = function(id) {
        for (var i = 0; i < this.quantityOfProducts.length; i++) {
            if (this.quantityOfProducts[i].getId() == id) {
                return i;
            }
        }
    };
    this.calculerTotal = function() {
        var qop = this.getQuantityOfProduct();
        this.total = 0;
        if (qop != null) {
            for (y = 0; y < qop.length; y++) {
                var prix = qop[y].getProduit().getPrix();
                var quantity = qop[y].getQuantity();
                this.total += prix * quantity;
            }
        } else {
            showErrorMessage("qop == null");
        }
        return this.total;
    };
}
function ConseilDuChef() {
    this.id;
    this.produit;
    this.getId = function() {
        return this.id;
    };
    this.setId = function(id) {
        this.id = id;
    };
    this.getProduit = function() {
        return this.id;
    };
    this.setProduit = function(produit) {
        this.produit = produit;
    };
}
function AssociationProduitIngredients(produit, ingredient, inStart, surcout, supprimable) {
    this.produit = produit;
    this.ingredient = ingredient;
    this.inStart = inStart;
    this.surcout = surcout;
    this.supprimable = supprimable;
    this.isAdded = false;
}
function Table(id, numero) {
    this.id = id;
    this.numero = numero;
}
function ModeDeReglements(id, nom, url, redirictUrl) {
    this.id = id;
    this.nom = nom;
    this.url = url;
    this.redirictUrl = redirictUrl;
    this.getId = function() {
        return this.id;
    };
    this.setId = function(id) {
        this.id = id;
    };
    this.getNom = function() {
        return this.nom;
    };
    this.setNom = function(nom) {
        this.nom = nom;
    };
    this.getUrl = function() {
        return this.url;
    };
    this.setUrl = function(url) {
        this.url = url;
    };
    this.getRedirictUrl = function() {
        return this.redirictUrl;
    };
    this.setRedirictUrl = function(redirictUrl) {
        this.redirictUrl = redirictUrl;
    };
}
function PrixParPersonne(personne, totalpersonne) {
    this.type = "PRIXPARPERSONNE";
    this.personne = personne;
    this.totalpersonne = totalpersonne;
}
function ProduitNonAttribue(produit, idqop) {
    this.type = "PRODUITNONATTRIBUE";
    this.produit = produit;
    this.idqop = idqop;
}
function Personne(id, prenom, nom) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email;
    this.urlProfileImg;
}
function Compte() {
    this.id;
    this.login;
    this.password;

    this.setId = function(id) {
        this.id = id;
    };
    this.setLogin = function(login) {
        this.login = login;
    };
    this.setPassword = function(password) {
        this.password = password;
    };
    this.getId = function() {
        return this.id;
    };
    this.getLogin = function() {
        return this.login;
    };
    this.getPassword = function() {
        return this.password;
    };
}

function ParamForm() {

    this.id_form;
    this.actif;
    this.discrim;
    this.code_champ;
    this.id_label_html;
    this.type_html;
    this.class_html;
    this.style_html;
    this.ordre;
    this.id_html;


    this.getId_form = function() {
        return this.id_form;
    };

    this.getActif = function() {
        return this.actif;
    };

    this.getDiscrim = function() {
        return this.discrim;
    };

    this.getCode_champ = function() {
        return this.code_champ;
    };

    this.getId_label_html = function() {
        return this.id_label_html;
    };

    this.getType_html = function() {
        return this.type_html;
    };

    this.getClass_html = function() {
        return this.class_html;
    };

    this.getStyle_html = function() {
        return this.style_html;
    };

    this.getOrdre = function() {
        return this.ordre;
    };

    this.getId_html = function() {
        return this.id_html;
    };

    this.setId_form = function(id_form) {
        this.id_form = id_form;
    };

    this.setActif = function(actif) {
        this.actif = actif;
    };

    this.setDiscrim = function(discrim) {
        this.discrim = discrim;
    };

    this.setCode_champ = function(code_champ) {
        this.code_champ = code_champ;
    };

    this.setId_label_html = function(id_label_html) {
        this.id_label_html = id_label_html;
    };

    this.setType_html = function(type_html) {
        this.type_html = type_html;
    };

    this.setClass_html = function(class_html) {
        this.class_html = class_html;
    };

    this.setStyle_html = function(style_html) {
        this.style_html = style_html;
    };

    this.setOrdre = function(ordre) {
        this.ordre = ordre;
    };

    this.setId_html = function(id_html) {
        this.id_html = id_html;
    };

}

function AttributCompte() {

    this.id;
    this.code_champ;
    this.valeur_champ;
    this.id_compte;
    this.defaut;

    this.setId = function(id) {
        this.id = id;
    };
    this.setCode_champ = function(code_champ) {
        this.code_champ = code_champ;
    };
    this.setValeur_champ = function(valeur_champ) {
        this.valeur_champ = valeur_champ;
    };
    this.setId_compte = function(id_compte) {
        this.id_compte = id_compte;
    };
    this.setDefault = function(defaut) {
        this.defaut = defaut;
    };
    this.getId = function() {
        return this.id;
    };
    this.getCode_champ = function() {
        return this.code_champ;
    };
    this.getValeur_champ = function() {
        return this.valeur_champ;
    };
    this.getId_compte = function() {
        return this.id_compte;
    };
    this.getDefault = function() {
        return this.defaut;
    };
}