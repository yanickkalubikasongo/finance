/* DEBUT CHANGEMENT MOT DE PASSE */
function no_mdp(){
    let anc_mdp = document.getElementById('ancien_mdp'),
        n_mdp = document.getElementById('nou_mdp'),
        rpt_mdp = document.getElementById('repete_mdp'),
        erreur_un = document.getElementById('erreur_nouveau_mdp'),
        erreur_deux = document.getElementById('erreur_rep_nouveau_mdp'),
        valider = document.getElementById('signIn'),

        erreurs = []

        valeur = n_mdp.value

    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/.test(valeur)) {  
        erreurs.push('<span style="color:rgb(231, 5, 5);">Le mot de passe doit être composé de 10 caractères; avoir au moins une lettre majuscule, une lettre miniscule, un chiffre, et un caractère special</span>')
    }
    if(erreurs == ''){
        erreur_un.innerHTML = ''
        n_mdp.style.borderBlockColor = ''
        n_mdp.setAttribute('title','valide')
        
        if(rpt_mdp.getAttribute('title') == 'valide' && anc_mdp.value != ''){
            valider.disabled = false
        }
    }else{
        valider.disabled = true
        erreur_un.innerHTML = ''
        n_mdp.setAttribute('title','invalide')
        n_mdp.style.borderBlockColor = 'red'
        for (let i = 0; i < erreurs.length; i++) {
            erreur_un.innerHTML += erreurs[i] + '<br> '
        }
    }
}
function rep_nouveau_mdp(){
    let anc_mdp = document.getElementById('ancien_mdp'),
        n_mdp = document.getElementById('nou_mdp'),
        rpt_mdp = document.getElementById('repete_mdp'),
        erreur_un = document.getElementById('erreur_nouveau_mdp'),
        erreur_deux = document.getElementById('erreur_rep_nouveau_mdp'),
        valider = document.getElementById('signIn'),

        erreurs = []

        valeur = rpt_mdp.value

   
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/.test(valeur)) {  
        erreurs.push('<span style="color:rgb(231, 5, 5);">Le mot de passe doit être composé de 10 caractères; avoir au moins une lettre majuscule, une lettre miniscule, un chiffre, et un caractère special</span>')
    }
    if(erreurs == ''){
        erreur_deux.innerHTML = ''
        rpt_mdp.style.borderBlockColor = ''
        rpt_mdp.setAttribute('title','valide')
        
        if(n_mdp.getAttribute('title') == 'valide' && anc_mdp.value != ''){
            valider.disabled = false
        }
    }else{
        valider.disabled = true
        erreur_deux.innerHTML = ''
        rpt_mdp.setAttribute('title','invalide')
        rpt_mdp.style.borderBlockColor = 'red'
        for (let i = 0; i < erreurs.length; i++) {
            erreur_deux.innerHTML += erreurs[i] + '<br> '
        }
    }
}
/* FIN CHANGEMENT MOT DE PASSE */

/* DEBUT RECUPERATION MOT DE PASSE */
function new_mdp_recup(){
    let anc_mdp = document.getElementById('ancien_mdp'),
        n_mdp = document.getElementById('nou_mdp'),
        rpt_mdp = document.getElementById('repete_mdp'),
        erreur_un = document.getElementById('erreur_nouveau_mdp'),
        erreur_deux = document.getElementById('erreur_rep_nouveau_mdp'),
        valider = document.getElementById('signIn'),

        erreurs = []

        valeur = n_mdp.value

    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/.test(valeur)) {  
        erreurs.push('<span style="color:rgb(231, 5, 5);">Le mot de passe doit être composé de 10 caractères; avoir au moins une lettre majuscule, une lettre miniscule, un chiffre, et un caractère special</span>')
    }
    if(erreurs == ''){
        erreur_un.innerHTML = ''
        n_mdp.style.borderBlockColor = ''
        n_mdp.setAttribute('title','valide')
        rpt_mdp.disabled = false
        
        if(rpt_mdp.getAttribute('title') == 'valide' && anc_mdp.value != ''){
            valider.disabled = false
        }
    }else{
        rpt_mdp.disabled = true
        valider.disabled = true
        erreur_un.innerHTML = ''
        n_mdp.setAttribute('title','invalide')
        n_mdp.style.borderBlockColor = 'red'
        for (let i = 0; i < erreurs.length; i++) {
            erreur_un.innerHTML += erreurs[i] + '<br> '
        }
    }
}
function confirm_mdp_recup(){
    let anc_mdp = document.getElementById('ancien_mdp'),
        n_mdp = document.getElementById('nou_mdp'),
        rpt_mdp = document.getElementById('repete_mdp'),
        erreur_un = document.getElementById('erreur_nouveau_mdp'),
        erreur_deux = document.getElementById('erreur_rep_nouveau_mdp'),
        valider = document.getElementById('signIn'),

        erreurs = []

        valeur = rpt_mdp.value
   
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/.test(valeur)) {  
        erreurs.push('<span style="color:rgb(231, 5, 5);">Le mot de passe doit être composé de 10 caractères; avoir au moins une lettre majuscule, une lettre miniscule, un chiffre, et un caractère special</span>')
    }
    if(n_mdp.value != rpt_mdp.value){    
        erreurs.push('<span style="color:rgb(231, 5, 5);">Les deux mot de passe ne correspondent pas</span>')
    }    
    if(erreurs == ''){
        erreur_deux.innerHTML = ''
        rpt_mdp.style.borderBlockColor = ''
        rpt_mdp.setAttribute('title','valide')
        
        if(n_mdp.getAttribute('title') == 'valide' && anc_mdp.value != ''){
            valider.disabled = false
        }
    }else{
        valider.disabled = true
        erreur_deux.innerHTML = ''
        rpt_mdp.setAttribute('title','invalide')
        rpt_mdp.style.borderBlockColor = 'red'
        for (let i = 0; i < erreurs.length; i++) {
            erreur_deux.innerHTML += erreurs[i] + '<br> '
        }
    }
}
/* FIN RECUPERATION MOT DE PASSE */