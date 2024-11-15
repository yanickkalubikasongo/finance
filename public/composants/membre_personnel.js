/* Début style */

const personexist = {
    fontSize:'20px',
    color:'blue'
};
const styleimg = {
    width:'100px',
    height:"100px"
};
const spinner = {
    fontSize:'30px',
    color: '#ff6600'
  };
const stylebtnact = {
    backgroundColor:'#ff6600',
    borderColor:'#ff6600',
    color:'white'
};
const style_cellule = {
    verticalAlign: "baseline"
};
const stylefrom = {
  borderTop: '3px solid #000e38'
};
const divStyle = {
    marginTop:'10px'
};
const seachStyle = {
    marginLeft:'55px'
};
const seachStylebloc = {
   marginTop:'20px'
};
const styleentete = {
    backgroundColor:'#000e38',
    color:'white'
};
  const size_button = {
    with:'18px',
    height:'38px'
  };
  const choix_statut = {
    marginLeft:'137px'
  };
  const btn = {
    backgroundColor:' #FF9100',
    color:'white'
  };
  const btn_save = {
    borderRadius:'6px',
    backgroundColor:'#77B5FE',
    color:'white'
  };
  const msg = {
    backgroundColor:' #FF7F7F',
    color:'white'
  };
const style_act_profil = {
    backgroundColor:'#70726E',
    borderColor:'#70726E',
    color:'white'
};
const style_act_delete = {
    backgroundColor:'#FF0000',
    borderColor:'#FF0000',
    color:'white'
};
const style_titre_mis_a_jour = {
    color:'#FF6600',
    fontWeight:'bolder'
};
const style_act_modifier = {
    backgroundColor:'#FF6600',
    borderColor:'#FF6600',
    color:'white'
};
const blockbtn = {
    backgroundColor:'#FF6600',
    color:'white'
};
const style_lien = {
    color:'#FF6600'
};
const style_msg_retro = {
    color:'blue'
};
const stylePhotoProfil = {
    with:'80px',
    height:'80px',
    marginLeft:'15px'
};

const stylebtnactHidden = {
     display:'none'
}
const stylebtnactVisibility = {
     display:''
}
  
/* Fin style */
  
async function request_global(url,method,data) {
    try {
        const response = await fetch(url, {
            method: method, 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const resultat = await response.json();
        return resultat
    }catch (erreur) {
        console.error("Erreur :", erreur);
    }
}
class Option extends React.Component {
    render() {
        return <option selected={this.props.selected} value={this.props.value}>{this.props.option}</option>
    }
}
class Checkbox extends React.Component {
    render() {
      return (
        <div className="col-md-2" style={choix_statut}>
              <div className="form-check">
                <input className="form-check-input" value={this.props.value} checked={this.props.ch} onClick ={this.props.cl} onChange={this.props.change} name={this.props.name} type={this.props.check} id={this.props.id_for} />
                <label className="form-check-label" for={this.props.id_for}>{this.props.lbl}</label>
              </div>
        </div>
      )
    }
}
class Select_sex extends React.Component {
    render() {
        return (
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Sexe </label>
                <div className="col-sm-9">
                    <select name="sexe" value={this.props.val} disabled={this.props.disabled} onChange={this.props.change} className="form-control">
                        <Option value="" option="Choisir" />
                        <Option value="M" option="M" />
                        <Option value="F" option="F" />
                    </select>
                </div>
            </div>
        </div>
        )
    }
}
class Devise extends React.Component {
    render() {
        return (
        <div className={this.props.taille_devise}>
            <div className="form-group row">
                <label className="col-md-3 col-form-label">Devise </label>
                <div className={this.props.tail}>
                    <select name="devise" value={this.props.val} disabled={this.props.disabled} onChange={this.props.change} class="form-control">
                        <Option value="" option="Choisir" />
                        <Option value="CDF" option="CDF" />
                        <Option value="EUR" option="EUR" />
                        <Option value="USD" option="USD" />
                    </select>
                </div>
            </div>
        </div>
        )
    }
}
class Type_compte1 extends React.Component {
    render() {
        return (
            <div className="col-md-6">
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Type de compte </label>
                    <div className="col-sm-9">
                        <select name="type_compte" value={this.props.val} disabled={this.props.disabled} onChange={this.props.change} class="form-control">
                            <Option value="" option="Choisir" />
                            <Option value="Courant" option="Courant" />
                            <Option value="Epargne" option="Epargne" />
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}
class Type_compte2 extends React.Component {
    render() {
        return (
            <div className="col-md-6">
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Type de compte </label>
                    <div className="col-sm-9">
                        <select name="type_compte" value={this.props.val} disabled={this.props.disabled} onChange={this.props.change} class="form-control">
                            <Option value="Courant" option="Courant" />
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}
class Type_org extends React.Component {
    render() {
        return (
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Sexe </label>
                <div className="col-sm-9">
                <select name="sexe" value={this.props.val} disabled={this.props.disabled} onChange={this.props.change} class="form-control">
                        <Option value="Entreprise" option="Entreprise" />
                        <Option value="ONG" option="ONG" />
                </select>
                </div>
            </div>
        </div>
        )
    }
}
class Input extends React.Component { 
    render() {
        return (
            <div className="col-md-6">
                <div className="form-group row">
                    <label className="col-md-3 col-form-label">{this.props.label} </label>
                    <div className="col-md-9">
                        <input type={this.props.type} max={this.props.max} min={this.props.min} placeholder={this.props.plc} required data-id={this.props.id_member} onChange={this.props.change} onInput={this.props.inp} onClick={this.props.oncl} disabled={this.props.disabled} maxlength={this.props.taille} className={this.props.clas} style={this.props.styl} value={this.props.value} name={this.props.name} />
                    </div>
                </div>
            </div>
        )
    }
}
class Commune_update extends React.Component {
    render() {
        return (
            <div className="row">
                <label className="col-sm-3 col-form-label">Commune</label>
                <div className="col-sm-9">
                    <select name="comm" onChange={this.props.onChange} className="form-control commune">
                        <Option value="" option="Choisir" />
                        <Option value="Bandalungwa" option="Bandalungwa" />
                        <Option value="Barumbu" option="Barumbu" />
                        <Option value="Bumbu" option="Bumbu" />
                        <Option value="Gombe" option="Gombe" />
                        <Option value="Kalamu" option="Kalamu" />
                        <Option value="Kasa-Vubu" option="Kasa-Vubu" />
                        <Option value="Kimbanseke" option="Kimbanseke" />
                        <Option value="Kinshasa" option="Kinshasa" />
                        <Option value="Kintambo" option="Kintambo" />
                        <Option value="Kisenso" option="Kisenso" />
                        <Option value="Lemba" option="Lemba" />
                        <Option value="Limete" option="Limete" />
                        <Option value="Lingwala" option="Lingwala" />
                        <Option value="Makala" option="Makala" />
                        <Option value="Maluku" option="Maluku" />
                        <Option value="Masina" option="Masina" />
                        <Option value="Matete" option="Matete" />
                        <Option value="Mont-Ngafula" option="Mont-Ngafula" />
                        <Option value="Ndjili" option="Ndjili" />
                        <Option value="Ngaba" option="Ngaba" />
                        <Option value="Ngaliema" option="Ngaliema" />
                        <Option value="Ngiri-Ngiri" option="Ngiri-Ngiri" />
                        <Option value="Nsele" option="Nsele" />
                        <Option value="Selembao" option="Selembao" />
                    </select>
                </div>
            </div>
        )
    }
}
class Commune extends React.Component {
    render() {
        return (
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Commune</label>
                <div className="col-sm-9">
                    <select name="comm" value={this.props.value} onChange={this.props.change} class="form-control commune">
                        <Option value="" option="Choisir" />
                        <Option value="Bandalungwa" option="Bandalungwa" />
                        <Option value="Barumbu" option="Barumbu" />
                        <Option value="Bumbu" option="Bumbu" />
                        <Option value="Gombe" option="Gombe" />
                        <Option value="Kalamu" option="Kalamu" />
                        <Option value="Kasa-Vubu" option="Kasa-Vubu" />
                        <Option value="Kimbanseke" option="Kimbanseke" />
                        <Option value="Kinshasa" option="Kinshasa" />
                        <Option value="Kintambo" option="Kintambo" />
                        <Option value="Kisenso" option="Kisenso" />
                        <Option value="Lemba" option="Lemba" />
                        <Option value="Limete" option="Limete" />
                        <Option value="Lingwala" option="Lingwala" />
                        <Option value="Makala" option="Makala" />
                        <Option value="Maluku" option="Maluku" />
                        <Option value="Masina" option="Masina" />
                        <Option value="Matete" option="Matete" />
                        <Option value="Mont-Ngafula" option="Mont-Ngafula" />
                        <Option value="Ndjili" option="Ndjili" />
                        <Option value="Ngaba" option="Ngaba" />
                        <Option value="Ngaliema" option="Ngaliema" />
                        <Option value="Ngiri-Ngiri" option="Ngiri-Ngiri" />
                        <Option value="Nsele" option="Nsele" />
                        <Option value="Selembao" option="Selembao" />
                    </select>
                </div>
            </div>
        </div>
        )
    }
}
class Rep_type_membre extends React.Component {
    render() {
        return (
        <div className="row">
            <div className="col-md-3">
                <select name="marital_status" onChange={this.props.change} class="form-control">
                    <Option value="2" option="Répertoire des Personnels" />
                    <Option value="3" option="Répertoire des Gestionnaires des comptes" />
                    <Option value="4" option="Répertoire des Agents Agence" />
                    <Option value="5" option="Répertoire des Gestionnaires des crédits" />
                    <Option value="6" option="Répertoire des Gérants" />
                    <Option value="8" option="Répertoire des Agents Terrain" />
                </select>&nbsp;
            </div>
            <div className="col-xs-2">
                <button className="btn" style={blockbtn} onClick={this.props.cl1}><i className="fas fa-search"></i>&nbsp;Rechercher</button><br/><br/>
            </div>
            <div className="col-md-3">
                <input type="text" className="form-control" onInput={this.props.change_num_piece} placeholder="Entrer Num. Pièce d'identité" />&nbsp;&nbsp;
            </div>
            <div className="col-md-2">
                <select className="form-control" onChange={this.props.change_type_piece}>
                    {this.props.option}
                </select>&nbsp;&nbsp;
            </div>
            <div className="col-xs-2">
                <button className="btn" style={blockbtn} onClick={this.props.cl2}><i className="fas fa-search"></i>&nbsp;Rechercher</button>
            </div>
        </div>
        )
    }
}
class Rep_type_transaction extends React.Component {
    render() {
        return (
            <div className="row mt-2">
                <div className="col-md-2">
                    <label className="col-form-label">Type Transaction</label>
                </div>
                <div className="col-md-2">
                    <select name="type_transanction" onChange={this.props.onChange} className="form-control">
                        <Option value="Depot" option="Dépôt" />
                        <Option value="Retrait" option="Rétrait" />
                        <Option value="Transfert" option="Transfert" />
                    </select>
                </div>
                <Devise taille_devise="col-md-4" tail="col-sm-9" change={this.props.change} />
                <div className="col-md-2">
                    <button className="btn" onClick={this.props.clc} style={blockbtn}><i className="fas fa-search"></i>&nbsp;Rechercher</button>
                </div>
            </div>
        )
    }
}
class Liste extends React.Component {
    render() {
        return (
        <div className="col-md-6">
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">{this.props.libelle_list}</label>
                <div className="col-sm-9">
                <select name={this.props.name} value={this.props.value} onChange={this.props.change} className="form-control">
                    <option value="">Choisir</option>
                    {this.props.option}
                </select>
                </div>
            </div>
        </div>
        )
    }
}
class Msg extends React.Component {
    render() {
        return (
            <div className="col-sm-12">
                {this.props.bol}
            </div>
        )
    }
}

class Msg_reussite extends React.Component {
    render() {
        return (
            <div class="alert alert-success alert-dismissible fade show" id="alert" role="alert">
                <span class="badge badge-pill badge-success">Succès</span> {this.props.msg_reu}
            </div>
        )
    }
}
class Msg_erreur extends React.Component {
    render() {
        return (
            <div class="alert alert-danger alert-dismissible fade show" id="alert" role="alert">
                <span class="badge badge-pill badge-danger">Erreur(s)</span> {this.props.msg_err}
            </div>
        )
    }
}
class Membre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prenom              : '',
            nom                 : '',
            postnom             : '',
            sexe                :'',
            date_naissance      :'',
            lieu_naissance      :'',
            telephone           :'',
            chefferie           :'',
            territoire          :'',
            etat_civil          :'',
            province            :'',
            adresse             :'',
            membre              :'',
            agence              :'',
            telephone           :'',
            adresse_electronique:'',
            type_membre         :'',
            type_piece          :'',
            numero_piece        :'',
            state_msg           :'',
            erreur              :[],
            photo               :'',
            bol                 :''
        };
        this.change_prenom               = this.change_prenom.bind(this);
        this.change_chefferie            = this.change_chefferie.bind(this);
        this.change_nom                  = this.change_nom.bind(this);
        this.change_province             = this.change_province.bind(this);
        this.change_territoire           = this.change_territoire.bind(this);
        this.change_postname             = this.change_postname.bind(this);
        this.change_sexe                 = this.change_sexe.bind(this);
        this.change_adresse              = this.change_adresse.bind(this);
        this.change_telephone            = this.change_telephone.bind(this);
        this.change_lieu_naiss           = this.change_lieu_naiss.bind(this);
        this.change_adresse_electronique = this.change_adresse_electronique.bind(this);
        this.change_numero_piece         = this.change_numero_piece.bind(this);
        this.change_type_piece           = this.change_type_piece.bind(this);
        this.change_membre               = this.change_membre.bind(this);
        this.annuler                     = this.annuler.bind(this);
        this.change_date_naiss           = this.change_date_naiss.bind(this);
        this.change_agence               = this.change_agence.bind(this);
        this.change_etat_civil           = this.change_etat_civil.bind(this);
        this.change_photo                = this.change_photo.bind(this);
        this.handleSubmit                = this.handleSubmit.bind(this);
    }
    annuler() {
        this.setState({
            prenom              : '',
            nom                 : '',
            postnom             : '',
            sexe                :'',
            date_naissance      :'',
            lieu_naissance      :'',
            telephone           :'',
            chefferie           :'',
            territoire          :'',
            province            :'',
            adresse             :'',
            membre              :'',
            telephone           :'',
            adresse_electronique:'',
            type_membre         :'',
            type_piece          :'',
            numero_piece        :'',
            photo               :'',
            erreur              :''
        });
    }
    change_agence(event) {
        event.preventDefault()
        this.setState({agence: event.target.value});
    }
    async request(url,method,data) {
        try {
            const response = await fetch(url, {
                method: method, 
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const resultat = await response.json();
            return resultat
        }catch (erreur) {
            console.error("Erreur :", erreur);
        }
    }
    change_prenom(event) {
        event.preventDefault()
        this.setState({prenom: event.target.value});
    }
    change_photo(event) {
        event.preventDefault()
        this.setState({photo: event.target.value});
    }
    change_chefferie(event) {
        event.preventDefault()
        this.setState({chefferie: event.target.value});
    }
    change_nom(event) {
        event.preventDefault()
        this.setState({nom: event.target.value});
    }
    change_territoire(event) {
        event.preventDefault()
        this.setState({territoire: event.target.value});
    } 
    change_postname(event) {
        event.preventDefault()
        this.setState({postnom: event.target.value});
    }
    change_province(event) {
        event.preventDefault()
        this.setState({province: event.target.value});
    }
    change_sexe(event) {
        event.preventDefault()
        this.setState({sexe: event.target.value});
    }
    change_adresse(event) {
        event.preventDefault()
        this.setState({adresse: event.target.value});
    }
    change_telephone(event) {
        event.preventDefault()
        this.setState({telephone: event.target.value});
    }
    change_adresse_electronique(event) {
        event.preventDefault()
        this.setState({adresse_electronique: event.target.value});
    }
    change_lieu_naiss(event) {
        event.preventDefault()
        this.setState({lieu_naissance: event.target.value});
    }
    change_date_naiss(event) {
        event.preventDefault()
        this.setState({date_naissance: event.target.value});
    }
    change_membre(event) {
        event.preventDefault()
        this.setState({type_membre: event.target.value});
    }
    change_type_piece(event) {
        event.preventDefault()
        this.setState({type_piece: event.target.value});
    }
    change_etat_civil(event) {
        event.preventDefault()
        this.setState({etat_civil: event.target.value});
    }
    change_numero_piece(event) {
        event.preventDefault()
        this.setState({numero_piece: event.target.value});
    }
    photo(event) {
        event.preventDefault()
        this.setState({photo: event.target.value});
    }
    handleSubmit(event){
        event.preventDefault()
        this.setState({
            state_msg:'',
            erreur   :[]
        })
        var data = new FormData($('#my_member')[0]);

        let fichier = this.state.photo,
            extension = fichier.substring(fichier.length - 4, fichier.length)
        if(extension != '.jpg' && extension != '.png') {
            alert("Veuillez rentrer un fichier .JPG ou .PNG dans le champ 'Photo'")
        }else{
            $.ajax({
                url        : '/personnel/enreg_personnel',
                type       : 'POST',
                contentType: false,
                processData: false,
                cache      : false,
                data       : data
            })
            .done((response)=>{
                if(response.reponse=='r'){
                    this.setState({
                        prenom              : '',
                        nom                 : '',
                        postnom             : '',
                        sexe                :'',
                        date_naissance      :'',
                        lieu_naissance      :'',
                        telephone           :'',
                        chefferie           :'',
                        territoire          :'',
                        etat_civil          :'',
                        province            :'',
                        adresse             :'',
                        membre              :'',
                        agence              :'',
                        telephone           :'',
                        adresse_electronique:'',
                        type_membre         :'',
                        type_piece          :'',
                        numero_piece        :'',
                        state_msg           :'r',
                        erreur              :[],
                        photo               :'',
                        bol                 :''
                    })
                    swal({
                        title: "Succès",
                        text: "Membre LoanMe enregistré avec succès !",
                        icon: "success",
                        button: false,
                    });
                }
                else{
                    if(response.reponse =='deconnexion'){
                        window.location.replace("https://admin.loanmesfn.com/")
                    }else{
                        let err = response.reponse,
                        erreurs=[]
                        for (let i = 0; i < err.length; i++) {
                            erreurs.push(err[i])
                        }
                        this.setState({
                            state_msg:'e',
                            erreur:erreurs
                        })
                        
                        swal({
                            title: "Erreur",
                            text: ''+erreurs,
                            icon: "error",
                            button:false
                        });
                    }
                }
            })
            .fail(function(error){
                this.setState({
                    textMsg     :"",
                    classMsg    :"",
                    typeMsg     :'',
                    showAlertMsg:'',
                    alertMsg    :'',
                    closeMsg    :'',
                    type_btn    :'',
                    bol         :''
                }) 
            })
        }
        return false
    }
    render() { 
        let res = this.props.province,
            listProvince = res.map(item => (
                <Option value={item.id} option={item.libelle} />
            )),
            res_piece = this.props.type_piece,
            listPiece = res_piece.map(item => (
                <Option value={item.id} option={item.libelle} />
            )),
            res_type_membre = this.props.type_membre,
            listTypeMembre = res_type_membre.map(item => (
                <Option value={item.id} option={item.libelle} />
            )),
            res_type_membre2 = this.props.type_membre2,
            listTypeMembre2 = res_type_membre2.map(item => (
                <Option value={item.id} option={item.type_membre} />
            )),
            res_etat_civil = this.props.etat_civil,
            listEtatCivil = res_etat_civil.map(item => (
                <Option value={item.id} option={item.libelle} />
            ))
        return (
            <div className="col-12" style={divStyle}>
                 <div className="card form-card" style={stylefrom}>
                        
                        <div className="card-body">
                            <hr/>
                            <form method="post" onSubmit={this.handleSubmit} enctype="multipart/form-data" accept-charset="UTF-8" id="my_member">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Type d'acteur</label>
                                            <div className="col-sm-9">
                                            <select name="type_membre" value={this.state.type_membre} onChange={this.change_membre} className="form-control">
                                                <option value="">Choisir</option>
                                                {listTypeMembre}
                                                {listTypeMembre2}
                                            </select>
                                            </div>
                                        </div>
                                    </div>
                                    <Input label="Prénom" type="text" clas="form-control" taille="15" name="prenom" value={this.state.prenom} inp={this.change_prenom} />
                                    <Input label="Nom" type="text" clas="form-control" taille="15" name="nom" value={this.state.nom} inp={this.change_nom} />
                                    <Input label="Postnom" type="text" clas="form-control" taille="15" name="postnom" value={this.state.postnom} inp={this.change_postname} />
                                    <Liste value={this.state.province} libelle_list="Province" name="province" option={listProvince} change={this.change_province} />
                                    <Select_sex label="Sexe" type="text" clas="form-control" taille="1" val={this.state.sexe} change={this.change_sexe} />
                                    <Input label="Adresse" type="text" clas="form-control" taille="30" name="adresse" value={this.state.adresse} inp={this.change_adresse} />
                                    <Input label="Date de naissance" type="date" clas="form-control" taille="15" name="date_naissance" value={this.state.date_naissance} change={this.change_date_naiss} />
                                    <Input label="Téléphone" plc="+243XXXXXXXXX" type="tel" clas="form-control" taille="13" name="telephone" value={this.state.telephone} inp={this.change_telephone} />
                                    <Input label="Adresse Electronique" type="email" clas="form-control" taille="255" name="email" value={this.state.adresse_electronique} inp={this.change_adresse_electronique} />
                                    <Input label="Lieu de naissance" type="text" clas="form-control" taille="15" name="lieu_naissance" value={this.state.lieu_naissance} inp={this.change_lieu_naiss} />
                                    <div className="col-md-6" style={(this.state.type_membre == 6) ? stylebtnactHidden : stylebtnactVisibility}>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Agence</label>
                                            <div className="col-sm-9">
                                                <select name="agence" value={this.state.agence} onChange={this.change_agence} class="form-control">
                                                    <option value="">Choisir</option>
                                                    {this.props.agence}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <Input label="Photo" type="file" value={this.state.photo} inp={this.change_photo} accept=".jpg,.png,.gif" clas="form-control" taille="15" name="photo" />
                                    <Liste value={this.state.type_piece} libelle_list="Type de pièce d'identité" name="piece" option={listPiece} change={this.change_type_piece} />
                                    <Liste value={this.state.etat_civil} libelle_list="Etat-civil" option={listEtatCivil} name="etat_civil" change={this.change_etat_civil} />
                                    <Input label="Numéro pièce d'identité" type="text" clas="form-control" taille="30" name="numero_piece" value={this.state.numero_piece} inp={this.change_numero_piece} />
                                </div><hr/>
                                <div className="form-group m-b-0 text-right">
                                    <button value="Enregistrer" style={blockbtn} className="btn"><i className="fas fa-save"></i>&nbsp;Créer Utilisateur</button>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        )
    }
}
class Partenaire extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                prenom           : '',
                nom              : '',
                id_gerant        :0,
                postnom          : '',
                etat_civil       :'',
                date_naissance   :'',
                lieu_naissance   :'',
                email            :'',
                fichier          :'',
                id_user          :'',
                adresse_physique :'',

                denomination     :'',
                id_nat           :'',
                rccm             :'',
                telephone_org    :'',
                autorisation     :'',
                tableau_personnel:[],
                
                type_piece       :'',
                num_piece        :'',
                state_msg        :'',
                erreur           :[]
        };
        this.change_denomination = this.change_denomination.bind(this);
        this.change_id_nat       = this.change_id_nat.bind(this);
        this.adresse_physique    = this.adresse_physique.bind(this);
        this.change_rccm         = this.change_rccm.bind(this);
        this.change_telephone_org= this.change_telephone_org.bind(this);
        this.searche_patner      = this.searche_patner.bind(this);
        this.change_email        = this.change_email.bind(this);
        this.change_num_piece    = this.change_num_piece.bind(this);
        this.change_type_piece   = this.change_type_piece.bind(this);
        this.change_autorisation = this.change_autorisation.bind(this);
        this.change_telephone    = this.change_telephone.bind(this);
        this.fichier             = this.fichier.bind(this);
        this.handleSubmit        = this.handleSubmit.bind(this);
    }
    adresse_physique(event) {
        event.preventDefault()
        this.setState({adresse_physique: event.target.value});
    }
    fichier(event) {
        event.preventDefault()
        this.setState({fichier: event.target.value});
    }
    change_num_piece(event) {
        event.preventDefault()
        this.setState({num_piece: event.target.value});
    }
    change_telephone(event) {
        event.preventDefault()
        this.setState({telephone_org: event.target.value});
    }
    change_autorisation(event) {
        event.preventDefault()
        this.setState({autorisation: event.target.value});
    }
    change_type_piece(event) {
        event.preventDefault()
        this.setState({type_piece: event.target.value});
    }
    change_email(event) {
        event.preventDefault()
        this.setState({email: event.target.value});
    }
    change_telephone_org(event) {
        event.preventDefault()
        this.setState({telephone: event.target.value});
    }
    change_denomination(event) {
        event.preventDefault()
        this.setState({denomination: event.target.value});
    }
    change_id_nat(event) {
        event.preventDefault()
        this.setState({id_nat: event.target.value});
    }
    change_rccm(event) {
        event.preventDefault()
        this.setState({rccm: event.target.value});
    }
    handleSubmit(event){
        event.preventDefault()
        this.setState({
            state_msg:'',
            erreur:[]
        })
        var data = new FormData($('#my_patner')[0]);

        let fichier = this.state.fichier,
            extension = fichier.substring(fichier.length - 4, fichier.length)
        if(extension != '.pdf') {
            alert("Veuillez rentrer un fichier .PDF dans le champ 'Autaurisation Ouv.'")
        }else{
            $.ajax({
                url        : '/partenaire/enreg_partenaire',
                type       : 'POST',
                contentType: false,
                processData: false,
                cache      : false,
                data       : data
            })
            .done((response)=>{
                if(response.reponse=='r') {
                    this.setState({
                        prenom           : '',
                        nom              : '',
                        postnom          : '',
                        etat_civil       :'', 
                        email            :'',
                        date_naissance   :'',
                        id_gerant        :'',
                        fichier          :'',
                        lieu_naissance   :'',
                        denomination     :'',
                        id_nat           :'',
                        rccm             :'',
                        telephone_org    :'',
                        autorisation     :'',
                        tableau_personnel:[],
                        type_piece       :'',
                        id_user          :'',
                        num_piece        :'',
                        adresse_physique :'',
                        state_msg        :'r',
                        erreur           :[]
                    });
                    swal({
                        title: "Succès",
                        text: "Structure enregistrée avec succès.",
                        icon: "success",
                        button: false
                    });
                }else{
                    if(response.result =='deconnexion'){
                        window.location.replace("https://admin.loanmesfn.com/")
                    }else{
                        let err = response.reponse,
                            erreurs=[]
                        for (let i = 0; i < err.length; i++) {
                            erreurs.push(err[i])
                        }
                        this.setState({
                            state_msg:'e',
                            erreur:erreurs
                        })
                        swal({
                            title: "Erreur",
                            text: ''+erreurs,
                            icon: "error",
                            button:false
                        }); 
                    }
                }
            })
            .fail(function(error){
                alert('Erreur Inconnu')
            })
        }
        return false
    }
    async request(url,method,data) {
        try {
            const response = await fetch(url, {
                method: method, 
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const resultat = await response.json();
            return resultat
        }catch (erreur) {
            console.log("Erreur :", erreur);
        }
    }
    async searche_patner() {
         this.setState({
                prenom        :'',
                nom           :'',
                postnom       :'',
                etat_civil    :'',
                date_naissance:'',
                id_user       :'',
                id_gerant     :'',
                lieu_naissance:''
            });
        let data={
            num_piece  :this.state.num_piece,
            type_piece :this.state.type_piece,
            rep        :false,
            type_member:2
        },
        send_membre = await this.request("/partenaire/find_gerant","POST",data),
        res = send_membre.reponse
        if(res==''){
            this.setState({
                prenom        :'',
                nom           :'',
                postnom       :'',
                etat_civil    :'',
                date_naissance:'',
                id_user       :'',
                id_gerant     :'',
                lieu_naissance:''
            });
            swal({
                title: "Erreur",
                text: 'Aucun gérant n\'est trouvé',
                icon: "error",
                button:false
            });
        }else{
            if(res =='deconnexion'){
                window.location.replace("https://admin.loanmesfn.com/")
            }else{
                res.map((item)=>{
                    if(item.id_part != 0){
                        swal({
                            title: "Erreur",
                            text: 'Ce gérant est déjà membre d\'une structure',
                            icon: "error",
                            button:false
                        });
                    }else{
                        this.setState({
                            prenom        :item.prenom,
                            id_gerant     :item.id_memb,
                            nom           :item.nom,
                            postnom       :item.post_nom,
                            etat_civil    :item.lb,
                            date_naissance:item.date_naissance,
                            lieu_naissance:item.lieu_naissance, 
                            id_user       :item.id,
                            state_msg     :'',
                            erreur        :[]
                        });
                    }
                })
            }
        }
    }
    render() {
        let res = this.props.piece,
            listPiece = res.map(item => (
                <Option value={item.id} option={item.libelle}/>
            ))
        return (
            <div className="col-12" style={divStyle}>
                 <div className="card form-card" style={stylefrom}>
                    <div className="card-body">
                           <div className="row">
                                <Input plc="Entrer Numéro carte d'identité" clas="form-control col-12" taille="15" value={this.state.num_piece} inp={this.change_num_piece} type="text" />
                                <div className="col-md-4">
                                    <select className="form-control" value={this.state.type_piece} onChange={this.change_type_piece}>
                                        <option value="">Choisir type pièce d'identité</option>
                                        {listPiece}
                                    </select>&nbsp;&nbsp;
                                </div>
                                <div className="col-md-2">
                                    <button className="btn" onClick={this.searche_patner} disabled={this.state.disabled_id_g} style={blockbtn}><i className="fas fa-search"></i>&nbsp;Rechercher</button>
                                </div>
                            </div><hr/><br/>
                        <form method="post" onSubmit={this.handleSubmit} enctype="multipart/form-data" accept-charset="UTF-8" id="my_patner">
                            <div className="row">
                                <Input disabled="true" label="Noms" plc="Prénom, Nom et Postnom du gérant" clas="form-control" value={this.state.prenom +' '+ this.state.nom +' '+ this.state.postnom } type="text" />
                                <Input name="denomination" label="Dénomination" plc="Dénomination de la structure" clas="form-control" taille="30" value={this.state.denomination} inp={this.change_denomination}  type="text" />
                                <Input disabled="true" label="Etat-civil" plc="Etat-civil du gérant" clas="form-control" value={this.state.etat_civil} type="text" />
                                <Input name="id_nat" label="Id Nat." plc="Identifiant national de la structure" clas="form-control" taille="25" value={this.state.id_nat} inp={this.change_id_nat} type="text" />
                                <Input disabled="true" label="Lieu Naiss." plc="Lieu de naissance" clas="form-control" taille="15" value={this.state.lieu_naissance} type="text" />
                                <Input name="rccm_f" label="RCCM ou F92" plc="RCCM ou F92 de la structure" clas="form-control" taille="25" value={this.state.rccm} inp={this.change_rccm} type="text" />
                                <Input disabled="true" label="Date Naiss." plc="Date de Naissance" clas="form-control" value={this.state.date_naissance} type="text" />
                                <Input name="telephone" taille="13" label="Téléphone" plc="Contact de la structure" clas="form-control" value={this.state.telephone_org} change={this.change_telephone} type="tel" />
                                <Input name="email" label="Email" taille="255" plc="Adresse email du la structure" clas="form-control" value={this.state.email} change={this.change_email} type="email" />
                                <Input name="autorisation" label="Autaurisation Ouv." plc="Extrait Aut. Ouvert." value={this.state.fichier} change={this.fichier} accept="application/pdf" clas="form-control" type="file" />
                                <Input name="adresse_physique" taille="30" value={this.state.adresse_physique} change={this.adresse_physique} label="Adresse physique" plc="L'adresse physique du partenaire" clas="form-control" type="text" />
                                <input name="id_gerant" type="hidden" value={this.state.id_gerant} />
                                <input name="id_user" type="hidden" value={this.state.id_user} />
                            </div><hr/>
                            <div className="form-group m-b-0 text-right">
                                <button className="btn" style={blockbtn}><i className="fas fa-save"></i>&nbsp;Enregister</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
class Cellule_tableau extends React.Component {
    render() {
      return (
        <th>{this.props.label}</th>
      )
    }
}
class Cellule_corps_tableau extends React.Component {
    render() {
      return (
        <tr>
            <td style={style_cellule}>{this.props.nature}</td>
            <td style={style_cellule}>{this.props.min}</td>
            <td style={style_cellule}>{this.props.max}</td>
            <td style={style_cellule}>{this.props.frais}</td>
            <td style={style_cellule}>{this.props.action}</td>
        </tr>
      )
    }
}
class Cellule_cors_tableau extends React.Component {
    render() {
      return (
        <tr>
          <td style={style_cellule}>{this.props.num_piece}</td>
          <td style={style_cellule}>{this.props.type_piece}</td>
          <td style={style_cellule}>{this.props.denomination}</td>
          <td style={style_cellule}>{this.props.id_nat}</td>
          <td style={style_cellule}>{this.props.action}</td>
        </tr>
      )
    }
}
class Cellule_cors_membre extends React.Component {
    render() {
      return (
        <tr>
          <td style={style_cellule}>{this.props.id}</td>
          <td style={style_cellule}>{this.props.prenom}</td>
          <td style={style_cellule}>{this.props.nom}</td>
          <td style={style_cellule}>{this.props.postnom}</td>
          <td style={style_cellule}>{this.props.type_membre}</td>
          <td style={style_cellule}>{this.props.action}</td>
        </tr>
      )
    }
}
class Action_membre extends React.Component {
    render() {
        return (
            <div>
                <button type="button" className="btn" onClick={this.props.cl} data-id={this.props.data_id} data-type={this.props.data_type} data-target="#exampleModal1" style={style_act_profil}><i className="fas fa-eye"></i>&nbsp;Détail</button>&nbsp;&nbsp;
                <button type="button" className="btn" onClick={this.props.clc} data-id={this.props.data_id} data-target="#exampleModal2" style={this.props.style}><i className="fas fa-user-edit"></i>&nbsp;Modifier</button>&nbsp;&nbsp;
                <button type="button" className="btn" data-id_membre={this.props.id_member} onClick={this.props.clic} data-state={this.props.data_state} data-id={this.props.data_id} data-type={this.props.data_type} style={this.props.style_state}><i className={this.props.icone_state}></i>&nbsp;{this.props.libelle}</button>
            </div>
        )
    }
}
class Action_partenaire extends React.Component {
    render() {
        return (
            <div>
                <button type="button" className="btn" onClick={this.props.cl} data-id={this.props.data_id} data-target="#exampleModal3" style={blockbtn}><i className="fas fa-eye"></i>&nbsp;{this.props.libelle}</button>
            </div>
        )
    }
}
class Detail_utilisateur extends React.Component {
    render() {
        return (
            <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="exampleModalLabel1" style={style_titre_mis_a_jour}>PROFIL DU MEMBRE</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="modal_user">
                            <div className="row">
                                <span className="photo media-left"><img style={stylePhotoProfil} id="photo" alt="avatar" src={this.props.photo} onError={this.props.err_photo} /></span>
                            </div><br/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="adresse_electronique_voir_plus"><a href={"mailto:"+ this.props.email}>{this.props.email}</a></span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Adresse physique</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="adresse_physique_voir_plus">{this.props.adresse_physique}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Lieu de naissance</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="lieu_naissance">{this.props.lieu_naissance}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Date de naissance</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="date_naissance">{this.props.date_naissance}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Téléphone</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="telephone">{this.props.telephone}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Sexe</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="sexe">{this.props.sexe}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Agence/Partenaire</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="agence">{this.props.structure}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Update_user extends React.Component {
    render() {
        return (
            <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 style={style_titre_mis_a_jour} className="modal-title" id="exampleModalLabel2">MISE A JOUR DU MEMBRE</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="modal_user">
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Type</label>
                                <div className="col-sm-9">
                                    <select name="marital_status" onChange={this.props.onchange_type_membre} className="form-control marital_status">
                                        <Option value="" option="Choisir Répertoire"/>
                                        <Option selected={this.props.selection1} value="2" option="Personnel" />
                                        <Option selected={this.props.selection2} value="3" option="Gestionnaire des comptes" />
                                        <Option selected={this.props.selection3} value="4" option="Agent Agence" />
                                        <Option selected={this.props.selection4} value="5" option="Gestionnaire des crédits" />
                                        <Option selected={this.props.selection6} value="8" option="Agent Terrain" />
                                    </select>
                                </div>
                            </div><br/>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Agence</label>
                                <div className="col-sm-9">
                                    <select name="agence" onChange={this.props.onChange_agence} className="form-control">
                                        {this.props.list_agence}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button aria-label="Close" data-dismiss="modal" onClick={this.props.update_membre} className="btn" style={stylebtnact}><i className="fas fa-user-edit"></i>&nbsp;Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Repertoire_personnel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableau_personnel:[],
            tableau_agence   :[],
            date_naissance   :'',
            rep_member       :2,
            type_membre      :0,
            id_personnel     :0,
            id_partenaire    :0,
            agence           :0,
            type_piece       :1,
            num_piece        :'',
            id_agence        :0,
            state_msg        :'',
            selection1       :'',
            selection2       :'',
            selection3       :'',
            selection4       :'',
            selection5       :'',
            selection6       :'',
            email            :'',
            adresse_physique :'',
            lieu_naiss       :'',
            state_user       :'',
            structure        :'',
            photo            :'',
            one_erreur       :'',
            sexe             :'',
            telephone        :'',
            id_member        :0,
            id_user_membre   :0,
            rep              :false
        };
        this.search_member    = this.search_member.bind(this);
        this.search_id_member = this.search_id_member.bind(this);
        this.change_member    = this.change_member.bind(this);
        this.input_id         = this.input_id.bind(this);
        this.modifier         = this.modifier.bind(this);
        this.type_membre      = this.type_membre.bind(this);
        this.agence           = this.agence.bind(this);
        this.voir_plus        = this.voir_plus.bind(this);
        this.send_update      = this.send_update.bind(this);
        this.modifier         = this.modifier.bind(this);
        this.num_piece        = this.num_piece.bind(this);
        this.type_piece       = this.type_piece.bind(this);
        this.desactiver_user  = this.desactiver_user.bind(this);
    }
    async request(url,method,data) {
        try {
            const response = await fetch(url, {
                method: method, 
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const resultat = await response.json();
            return resultat
        }catch (erreur) {
            console.error("Erreur :", erreur);
        }
    }
    async desactiver_user(event) {
        event.preventDefault()

        swal({
            title: "Attention",
            text: "Êtes-vous sûr de désactiver/activer cet utilisateur ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                let data = {
                        id: (this.state.id_partenaire == '') ? event.target.getAttribute('data-id') : this.state.id_partenaire,
                        type: event.target.getAttribute('data-type'),
                        id_membre:event.target.getAttribute('data-id_membre'),
                        state:event.target.getAttribute('data-state')
                    },
                    response = await this.request("/personnel/change_state","POST",data),
                    res = response.result
                if(res == 'r'){
                    this.setState({tableau_personnel : []}); 

                    if(this.state.rep == true){
                        let data = {
                            id  :this.state.rep_member,
                            type:1
                        }

                        let response = await this.request("/personnel/rep_personnel","POST",data)
                        this.setState({
                            tableau_personnel : response.result,
                            state_msg:'',
                            state_user:''
                        });
                    }else{
                        let data={
                            num_piece :this.state.num_piece,
                            type_piece:this.state.type_piece
                        },
                        send_membre = await this.request("/partenaire/find_user","POST",data)
                        this.setState({tableau_personnel : send_membre.reponse,state_msg:'',rep:false}); 
                    }

                    swal("l'utilisateur a été activé/désactivé !", {
                        icon: "success",
                        button:false
                    });
                }
            } else {
                swal("L'opération d' activé/désactivé est annulée !");
            }
        });
    }
    change_member(event) {
        event.preventDefault()
        this.setState({rep_member : event.target.value}); 
    }
    async voir_plus(event) {
        //event.preventDefault()
        $('#exampleModal1').modal('hide');
        
        let data = {
                id  : event.target.getAttribute('data-id'),
                type: event.target.getAttribute('data-type'),
            },
            response = await this.request("/personnel/on_personnel","POST",data),
            res = response.result
        res.map(item => (
            this.setState({
                date_naissance   :item.date_naissance,
                email            :item.email,
                adresse_physique :item.adresse_physique,
                lieu_naiss       :item.lieu_naissance,
                structure        :item.denomination,
                photo            :item.photo,
                telephone        :item.telephone,
                sexe             :item.sexe,
                one_erreur       :'https://agence.loanmesfn.com/'+item.photo
            })
        ))
        if(res !='') $('#exampleModal1').modal('show');
    }
    replaceImage = (error) => {
        //replacement of broken Image
        error.target.src = this.state.one_erreur;
    }
    input_id(event) {
        event.preventDefault()
        this.setState({id_member : event.target.value});
    }
    num_piece(event) {
        event.preventDefault()
        this.setState({num_piece : event.target.value});
    }
    type_piece(event) {
        event.preventDefault()
        this.setState({type_piece : event.target.value});
    }
    type_membre(event) {
        event.preventDefault()
        this.setState({type_membre:event.target.value});
    }
    agence(event) {
        event.preventDefault()
        this.setState({id_agence:event.target.value});
    }
    async search_id_member() {
        this.setState({state_msg : 'attente'});
        let data={
                num_piece :this.state.num_piece,
                type_piece:this.state.type_piece,
                rep       :false
            },
            send_membre = await this.request("/partenaire/find_user","POST",data)
        this.setState({tableau_personnel : send_membre.reponse,state_msg:'',rep:false}); 
        let resultat = send_membre.reponse
        resultat.map(item => (
            this.setState({ id_partenaire: (item.id_part) ? item.id_part : '' })
        ))
    }
    async search_member(event) {
        //event.preventDefault()
        this.setState({state_msg : 'attente'});
        let data = {
                id  :this.state.rep_member,
                type:1
            }
        this.setState({tableau_personnel : []}); 
        let response = await this.request("/personnel/rep_personnel","POST",data),
            resultat =  response.result
            resultat.map(item => (
                this.setState({ 
                    id_partenaire: (item.id_part) ? item.id_part : ''
                })
            ))
        this.setState({
            tableau_personnel : response.result,
            rep:true,
            state_msg:''
        });
    }
    async modifier(event) {
        //event.preventDefault()
        $('#exampleModal2').modal('hide');
        this.setState({id_personnel:event.target.getAttribute('data-id')});
        let id = event.target.getAttribute('data-id'),
            data = {
                id:id
            },
            response = await this.request("/personnel/on_personnel","POST",data),
            res = response.result
        if(res =='deconnexion'){
            window.location.replace("https://admin.loanmesfn.com/")
        }else{
            res.map(item => (
                (item.id_type ==2) ? this.setState({selection1:'selected',selection2:'',selection3:'',selection4:'',selection5:'',selection6:'',id_agence:item.id_agence,type_membre:2}) :
                (item.id_type ==3) ? this.setState({selection1:'',selection2:'selected',selection3:'',selection4:'',selection5:'',selection6:'',id_agence:item.id_agence,type_membre:3}) :
                (item.id_type ==4) ? this.setState({selection1:'',selection2:'',selection3:'selected',selection4:'',selection5:'',selection6:'',id_agence:item.id_agence,type_membre:4}) :
                (item.id_type ==5) ? this.setState({selection1:'',selection2:'',selection3:'',selection4:'selected',selection5:'',selection6:'',id_agence:item.id_agence,type_membre:5}) :
                (item.id_type ==6) ? this.setState({selection1:'',selection2:'',selection3:'',selection4:'',selection5:'selected',selection6:'',id_agence:item.id_agence,type_membre:6}) :
                this.setState({selection1:'',selection2:'',selection3:'',selection4:'',selection5:'',selection6:'selected',id_agence:item.id_agence,type_membre:8})
            )) 
        }
        let response_rep_agence = await request_global("/agence/repertoire","POST",{})
        if(response_rep_agence.result =='deconnexion'){
            window.location.replace("https://admin.loanmesfn.com/")
        }else this.setState({tableau_agence:response_rep_agence.result}); 
        if(res !='' && response_rep_agence.result !='') $('#exampleModal2').modal('show');
    }
    async send_update() {
        let data = {
            type        :this.state.type_membre,
            agence      :this.state.id_agence,
            id_personnel:this.state.id_personnel
        },
        modif_person = await this.request("/personnel/update_personnel","POST",data)
        if(modif_person.result =='deconnexion'){
            window.location.replace("https://admin.loanmesfn.com/")
        }
        this.setState({id_member:'',agence:''});
    }
    render() { 
        const { tableau_personnel,tableau_agence } = this.state,
            listMembre = tableau_personnel.map(item => (
                <Cellule_cors_membre 
                    id         ={item.id} 
                    prenom     ={item.prenom} 
                    nom        ={item.nom} 
                    postnom    ={item.post_nom} 
                    type_membre={item.libelle} 
                    action     ={<Action_membre id_member={item.id_memb} icone_state={(this.state.state_user == '') ? ((item.etat != 2) ? 'fas fa-user-alt-slash' : 'fas fa-user-alt') : ((this.state.state_user != 2) ? 'fas fa-user-alt-slash' : 'fas fa-user-alt')} data_type={(item.id_type=='6') ? item.id_type : ''} style={(item.id_type=='6') ? stylebtnactHidden : stylebtnact} style_state={(this.state.state_user == '') ? ((item.etat != 2) ? style_act_delete : style_act_profil) : ((this.state.state_user != 2) ? style_act_delete : style_act_profil)} clc={this.modifier} clic={this.desactiver_user} cl={this.voir_plus} 
                    data_id    ={item.id} data_state={(this.state.state_user == '') ? ((item.etat != 2) ? 'Désactiver' : 'Activer') : ((this.state.state_user != 2) ? 'Désactiver' : 'Activer')} libelle={(this.state.state_user == '') ? ((item.etat != 2) ? 'Désactiver' : 'Activer') : ((this.state.state_user != 2) ? 'Désactiver' : 'Activer') } />} />
            )),
            res = this.props.piece,
            listTypePiece = res.map(item => (
                <Option value={item.id} option={item.libelle} />
            )),
            listAgence = tableau_agence.map(item => (
                (item.id== this.state.id_agence) ? <Option selected="selected" value={item.id} option={item.denomination}/> : <Option value={item.id} option={item.denomination}/>
            ))
        return (
            <div className="col-12" style={divStyle}>
                <div className="col-12">
                    <div className="card form-card" style={stylefrom}>
                        <div className="card-body" >
                            <Rep_type_membre option={listTypePiece} change_num_piece={this.num_piece} change_type_piece={this.type_piece} cl1={this.search_member} inp={this.input_id} change={this.change_member} cl2={this.search_id_member} />
                            {(this.state.state_msg == 'attente') ? <i id="sp" className="fas fa-spinner fa-pulse" style={spinner}></i> : '' } 
                            <table className="table table-striped" id="example">
                                <thead style={styleentete}>
                                    <Cellule_tableau label="Id" />
                                    <Cellule_tableau label="Prénom" />
                                    <Cellule_tableau label="Nom" />
                                    <Cellule_tableau label="Postnom" />
                                    <Cellule_tableau label="Type Membre" />
                                    <Cellule_tableau label="Action" />
                                </thead>
                                <tbody>
                                    {(tableau_personnel!='') ? listMembre :'Aucune Personne'}
                                </tbody>
                                <tfoot>
                                </tfoot>
                            </table>
                            <Detail_utilisateur telephone={this.state.telephone} sexe={this.state.sexe} photo={this.state.photo} err_photo={this.replaceImage} email={this.state.email} adresse_physique={this.state.adresse_physique} lieu_naissance={this.state.lieu_naiss} date_naissance={this.state.date_naissance} structure={this.state.structure} />
                            <Update_user onchange_type_membre={this.type_membre} onChange_agence={this.agence} update_membre={this.send_update} selection1={this.state.selection1} selection2={this.state.selection2} selection3={this.state.selection3} selection4={this.state.selection4} selection6={this.state.selection6} list_agence={listAgence} />
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}
class Detail_partenaire extends React.Component {
    render() {
        return (
            <div className="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="exampleModalLabel3" style={style_titre_mis_a_jour}>PROFIL DU PARTENAIRE</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="modal_user">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">RCCM OU F92</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="rccm">{this.props.rccm_f}</span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Téléphone</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="tel"><a href={"tel:"+ this.props.telephone}>{this.props.telephone}</a></span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <span id="email"><a href={"mailto:"+ this.props.email}>{this.props.email}</a></span>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Fiche d'autorisation</p>
                                </div>
                                <div className="col-sm-9">
                                    <span><a style={style_lien} target="blank_" id="fichier" href={this.props.fichier}>Lire ficher</a></span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Repertoire_partenaire extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                rccm_f   :'',
                telephone:'',
                email    :'',
                fichier  :''
        };
       this.voir_plus = this.voir_plus.bind(this);
    }
    async voir_plus(event) {
        //event.preventDefault()
        $('#exampleModal3').modal('hide');
        
        let data = {
            id: event.target.getAttribute('data-id')
        },
        response_rep_part = await request_global("/partenaire/find_organisation","POST",data),
        res = response_rep_part.reponse

        if(response_rep_part.result =='deconnexion'){
            window.location.replace("https://admin.loanmesfn.com/")
        }else{ 
            res.map(item => (
                this.setState({
                    rccm_f   :item.rccm_f,
                    telephone:item.telephone,
                    email    :item.email,
                    fichier  :'/'+ item.autorisation
                })
            ))
        }
        if(res !='') $('#exampleModal3').modal('show');
    }
    render() {
        const list_gerant = this.props.tab,
            resGerant = list_gerant.map(item => (
            <Cellule_cors_tableau num_piece={item.numero_piece} type_piece={item.typee} denomination={item.denomination} id_nat={item.id_nat} action={<Action_partenaire cl={this.voir_plus} libelle="Détail" data_id={item.id_org}/>}/>
        ))
        return (
            <div className="col-12" style={divStyle}>
                <div className="col-12">
                    <div className="card form-card" style={stylefrom}>
                        <div className="card-body" >
                            <table className="table table-striped" id="example">
                                <thead style={styleentete}>
                                    <Cellule_tableau label="Num Pièce d'Int." />
                                    <Cellule_tableau label="Type pièce d'identité" />
                                    <Cellule_tableau label="Dénomination" /> 
                                    <Cellule_tableau label="ID. National" />
                                    <Cellule_tableau label="Action" />
                                </thead>
                                <tbody>
                                   {resGerant}
                                </tbody>
                                <tfoot>
                                </tfoot>
                            </table>
                            <Detail_partenaire rccm_f={this.state.rccm_f} telephone={this.state.telephone} email={this.state.email} fichier={this.state.fichier} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Nouveau_compte extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                im              :'',
                id_piece_ident  :'',
                id_type_piece   :'',
                type_compte     :'', 
                type_membre     :'',
                lieu_naiss      :'',
                sexe            :'',
                email           :'',
                etat_civil      :'',
                telephone       :'',
                adresse_physique:'',
                date_naissance  :'',
                img             :'',
                id_compte       :'',
                id_agence       :'',
                noms            :'',
                id_member       :'',
                id_organisation :'',
                id_nationalite  :'',
                etat            :'',
                state_msg       :'',
                bol             :'',
                membre_patner   :'',
                erreur          :[]
        };
        this.change_im          = this.change_im.bind(this);
        this.id_piece_ident     = this.id_piece_ident.bind(this);
        this.id_type_piece      = this.id_type_piece.bind(this);
        this.type_compte        = this.type_compte.bind(this);
        this.numero_compte      = this.numero_compte.bind(this);
        this.searche_member     = this.searche_member.bind(this);
        this.send               = this.send.bind(this);
        this.change_type_compte = this.change_type_compte.bind(this);
    }
    change_im(event) {
        event.preventDefault()
        this.setState({im: event.target.value});
    }
    id_piece_ident(event) {
        event.preventDefault()
        this.setState({id_piece_ident: event.target.value});
    }
    id_type_piece(event) {
        event.preventDefault()
        this.setState({id_type_piece: event.target.value});
    }
    change_type_compte(event) {
        event.preventDefault()
        this.setState({type_compte: event.target.value});
    }
    type_compte(event) {
        event.preventDefault()
        this.setState({type_compte: event.target.value});
    }
    numero_compte(event) {
        event.preventDefault()
        this.setState({numero_compte: event.target.value});
    }
    async send() {
         this.setState({
            state_msg:'',
            erreur   :[]
        });
        let dataCompte = {
            type_compte      :this.state.type_compte,
            id_agence        :1,
            id_member        :this.state.id_member,
            id_partenaire    :this.state.id_organisation,
            membre_partrnaire:this.state.membre_patner,
            type_memb        :this.state.type_membre
        },
        send_compte = await request_global("/adherent/create_compte","POST",dataCompte)
        if(send_compte.r =='r'){
            this.setState({
                id_compte       :send_compte.result,
                
                img             :'',
                id_piece_ident  :'',
                id_type_piece   :'',
                im              :'',
                noms            :'',
                lieu_naiss      :'',
                sexe            :'',
                email           :'',
                etat_civil      :'',
                telephone       :'',
                adresse_physique:'',
                date_naissance  :'',
                type_membre     :'',

                etat            :'',
                id_member       :'',
                id_organisation :'',

                state_msg       :'r',
                erreur          :[],
                bol             :''
            })
            swal({
                title: "Succès",
                text: "Compte crée avec succès.",
                icon: "success",
                button: false,
            });            
        }else{
            if(send_compte.result =='deconnexion'){
                window.location.replace("https://admin.loanmesfn.com/")
            }else{
                let err    = send_compte.result,
                    erreurs=[]
                for (let i = 0; i < err.length; i++) {
                    erreurs.push(err[i])
                }
                this.setState({
                    state_msg:'e',
                    erreur   :erreurs
                })
                swal({
                    title: "Erreur",
                    text: ''+erreurs,
                    icon: "error",
                    button:false
                });
            }
        }
    }
    async searche_member() {
        this.setState({
            lieu_naiss      :'',
            sexe            :'',
            email           :'',
            etat_civil      :'',
            telephone       :'',
            adresse_physique:'',
            date_naissance  :'',
            type_membre     :'',
            img             :'',
            id_member       :'',
            state_msg       :'attente',
            type_compte     :'', 
            id_organisation :'',
            etat            :2
        });
        let data={
            im        :this.state.im,
            num_piece :this.state.id_piece_ident,
            type_piece:this.state.id_type_piece
        },
        searche_adherent = await request_global("/adherent/get_adherent_by_im_id_piece","POST",data),
        res = searche_adherent.result
        if(res==''){
            this.setState({
                im            :'',
                id_piece_ident:'',
                numero_compte :'',
                noms          :'',
                etat          :2,
                state_msg     :''
            });
            swal({
                title: "Erreur",
                text: 'Aucun membre n\'est trouvé',
                icon: "error",
                button:false
            });
        }else{
            if(res =='deconnexion'){
                window.location.replace("https://admin.loanmesfn.com/")
            }else{
                res.map((item)=>{
                    if(item.etat_us == 1){
                        (item.id_type == 6) ? this.setState({ type_compte:'Courant' }) : this.setState({ type_compte:'Courant' })
                        this.setState({
                            noms            :item.nom+' '+item.post_nom+' '+item.prenom,
                            etat            :1,
                            membre_patner   :(item.membre_partrnaire) ? true : false,
                            lieu_naiss      :item.lieu_naissance,
                            sexe            :item.sexe,
                            email           :item.use_mail,
                            etat_civil      :item.eta,
                            telephone       :item.telephone,
                            adresse_physique:item.adresse_physique,
                            date_naissance  :item.date_naissance,
                            type_membre     :item.id_type,
                            img             :item.photo,
                            id_member       :item.id_user,
                            id_organisation :item.id_org,
                            state_msg       :''
                        });
                    }else{
                        swal({
                            title: "Erreur",
                            text: 'Cet utilisateur est désactivé',
                            icon: "error",
                            button:false
                        });
                        this.setState({state_msg :''});
                    }
                })
            }
        }
    }
    render() {
        let res = this.props.piece,
            listPiece = res.map(item => (
                <Option value={item.id} option={item.libelle}/>
            ))
        return (
            <div className="col-12" style={divStyle}>
                <div className="card form-card" style={stylefrom}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3 mb-0">
                                <input value={this.state.id_piece_ident} onInput={this.id_piece_ident} placeholder="Entrer Id pièce d'identité" className="form-control" type="text" />&nbsp;&nbsp;
                            </div>
                            <div className="col-md-3 mb-0">
                                <select className="form-control" value={this.state.id_type_piece} onChange={this.id_type_piece}>
                                    <option value="">Choisir</option>
                                    {listPiece}
                                </select>&nbsp;&nbsp;
                            </div>
                            <div className="col-md-3 mb-0">
                                <input value={this.state.im} onInput={this.change_im} placeholder="Entrer Id National OU IM" className="form-control" type="text" />&nbsp;&nbsp;
                            </div>
                            <div className="col-md-3 mb-0">
                                <button className="btn" onClick={this.searche_member} style={blockbtn}><i className="fas fa-search"></i>&nbsp;Rechercher</button>
                            </div> 
                        </div>
                        <hr/>
                        <div className="row mt-0">
                            <div className="col-md-6 mt-0">
                               { (this.state.img) ? <img style={styleimg} src={this.state.img} className="rounded-circle" />:''}
                            </div>
                        </div><br/>
                        {(this.state.state_msg == 'attente') ? <i id="sp" className="fas fa-spinner fa-pulse" style={spinner}></i> : '' } 
                        <div className="row mt-0">
                            <Input disabled="true" label="Noms" plc="Prénom Nom Postnom" clas="form-control" value={this.state.noms} type="text" />
                            <Input disabled="true" label="lieu de naissance" plc="Lieu de naissance" clas="form-control" value={this.state.lieu_naiss} type="text" />
                            <Input disabled="true" label="Sexe" plc="Sexe" clas="form-control" value={this.state.sexe} type="text" />
                            <Input disabled="true" label="Email" plc="email" clas="form-control" value={this.state.email} type="text" />
                            <Input disabled="true" label="Etat-civil" plc="Etat-civil" clas="form-control" value={this.state.etat_civil} type="text" />
                            <Input disabled="true" label="Téléphone" plc="Téléphone" clas="form-control" value={this.state.telephone} type="text" />
                            <Input disabled="true" label="Adresse Physique" plc="Adresse Physique" clas="form-control" value={this.state.adresse_physique} type="text" />
                            <Input disabled="true" label="Date de naissance" plc="Date de naissance" clas="form-control" value={this.state.date_naissance} type="text" />
                            {(this.state.membre_patner == true) ? 
                            <Type_compte1 disabled={this.state.sexe_disabled} label="Type de Compte" clas="form-control" val={this.state.type_compte} change={this.change_type_compte} type="text" /> : 
                            <Type_compte2 disabled={this.state.sexe_disabled} label="Type de Compte" clas="form-control" val={this.state.type_compte} change={this.change_type_compte} type="text" /> }
                        </div>
                        <hr/>
                        {(this.state.state_msg == 'attente') ? <i id="sp" className="fas fa-spinner fa-pulse" style={spinner}></i> : '' } 
                        <div className="form-group m-b-0 text-right">
                            <button value="Enregistrer" onClick={this.send} className="btn" style={stylebtnact}><i class="fas fa-save"></i>&nbsp;Créer Compte </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Tableau_compte extends React.Component {
    render() {
      return (
        <tr>
          <td style={style_cellule}>{this.props.numero_compte}</td>
          <td style={style_cellule}>{this.props.noms}</td>
          <td style={style_cellule}>{this.props.sexe}</td>
          <td style={style_cellule}>{this.props.telephone}</td>
          <td style={style_cellule}>{this.props.type_compte}</td>
          <td style={style_cellule}>{this.props.agence}</td>
        </tr>
      )
    }
}
class Tableau_compte_organisation extends React.Component {
    render() {
      return (
        <tr>
          <td style={style_cellule}>{this.props.numero_compte}</td>
          <td style={style_cellule}>{this.props.organisation}</td>
          <td style={style_cellule}>{this.props.id_national}</td>
          <td style={style_cellule}>{this.props.telephone}</td>
          <td style={style_cellule}>{this.props.agence}</td>
          <td style={style_cellule}>{this.props.action}</td>
        </tr>
      )
    }
}
class Tableau_agence extends React.Component {
    render() {
      return (
        <tr>
          <td style={style_cellule}>{this.props.numero}</td>
          <td style={style_cellule}>{this.props.denomination}</td>
          <td style={style_cellule}>{this.props.telephone}</td>
          <td style={style_cellule}>{this.props.commune}</td>
          <td style={style_cellule}>{this.props.quartier}</td>
          <td style={style_cellule}>{this.props.rue}</td>
          <td style={style_cellule}>{this.props.action}</td>
        </tr>
      )
    }
}
class Repertoire_compte_membre extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                id_piece_ident:'',
                id_type_piece:'',
                compte       :[],
                state_msg    :''
        };
        this.id_piece_ident = this.id_piece_ident.bind(this);
        this.id_type_piece  = this.id_type_piece.bind(this);
        this.search_account = this.search_account.bind(this);
    }
    async id_piece_ident(event) {
        event.preventDefault()
        this.setState({id_piece_ident:event.target.value});
    }
    async id_type_piece(event) {
        event.preventDefault()
        this.setState({id_type_piece:event.target.value});
    }
    async search_account(event) {
        //event.preventDefault()

        this.setState({state_msg:'attente'});
        let data = {
            id            : 1,
            id_piece      : this.state.id_piece_ident,
            id_type_piece : this.state.id_type_piece
        },
        response_rep_part = await request_global("/adherent/rep_compte","POST",data),
        res = response_rep_part.result
        this.setState({ compte:res,state_msg:'' });
    }
    render() {
        let res_piece = this.props.piece,
            listPiece = res_piece.map(item => (
                <Option value={item.id} option={item.libelle}/>
            )),
            nom='',
            prenom='',
            post_nom='',
            sexe='',
            telephone='',
            im='',
            num_compte =[],
            num_piece_identite='',
            type_piece_identite='',
            name_agence ='',
            date_naissance='',
            email='',
            lieu_naissance='',
            etat_civil='',
            province='',
            photo = '',
            adresse_physique = ''
        function agence(code_agence) {
            let code_agen=''
            code_agen += code_agence
            while (code_agen.length < 4) {
                code_agen = '1'+code_agen
            } 
            return code_agen
        }
        function user_compte(code_user) {
            let code_us=''
            code_us += code_user
            while (code_us.length < 11) {
                code_us = '1'+code_us
            } 
            return code_us
        }
        function partenaire(code_agence) {
            let code_agen=''
            code_agen += code_agence
            while (code_agen.length < 4) {
                code_agen = '0'+code_agen
            } 
            return code_agen
        }
        function user_im(code_user) {
            let code_us=''
            code_us += code_user
            while (code_us.length < 6) {
                code_us = '0'+code_us
            } 
            return code_us
        }
        const { compte } = this.state,
        listCompte = compte.map(item => (
            nom = item.nom,
            post_nom = item.post_nom,
            prenom = item.prenom,
            sexe = item.sexe,
            telephone= item.telephone,
            im= partenaire(item.id_part) +'-'+ user_im(item.id_us),
            num_compte.push(agence(item.id_ag) +'-'+ user_compte(item.id_cmt) +' / '+ item.tp ),
            num_piece_identite = item.numero_piece,
            type_piece_identite = item.type_piece,
            name_agence += item.denomination,
            date_naissance= item.date_naissance,
            email = item.email,
            lieu_naissance = item.lieu_naissance,
            etat_civil = item.etat,
            province = item.prov,
            photo = item.photo,
            adresse_physique = item.adresse_physique
        ))
        
        return (
            <div className="col-12" style={divStyle}>
                <div className="col-12">
                    <div className="card form-card" style={stylefrom} >
                        <div className="card-body" >
                            <div className="row">
                                <div className="col-md-4">
                                    <input value={this.state.id_piece_ident} onInput={this.id_piece_ident} placeholder="Entrer Id pièce d'identité" className="form-control" type="text" />&nbsp;&nbsp;
                                </div>
                                <div className="col-md-4">
                                    <select className="form-control" value={this.state.id_type_piece} onChange={this.id_type_piece}>
                                        <option value="">Choisir type pièce identité</option>
                                        {listPiece}
                                    </select>&nbsp;&nbsp;
                                </div>
                                <div className="col-md-4">
                                    <button className="btn" onClick={this.search_account} style={blockbtn}><i className="fas fa-search"></i>&nbsp;Rechercher Compte</button>
                                </div>
                            </div>
                            {(this.state.state_msg == 'attente') ? <i id="sp" className="fas fa-spinner fa-pulse" style={spinner}></i> : '' } 
                            <br/>
                            {(photo) ? <img style={styleimg} src={photo} className="rounded-circle" /> : '' } <br/><br/>
                            <table className="table table-striped" id="example">
                                {(this.state.compte !='') ? <tr><td className="col-1">Prénom</td><td>: {prenom}</td><td className="col-1">Lieu de naissance</td><td>: {lieu_naissance}</td></tr> : '' }
                                {(this.state.compte !='') ? <tr><td className="col-1">Nom</td><td>: {nom}</td><td>Etat-civil</td><td>: {etat_civil}</td></tr>  : '' }
                                {(this.state.compte !='') ? <tr><td className="col-1">Postnom</td><td>: {post_nom}</td><td>Province</td><td>: {province}</td></tr> : '' }
                                {(this.state.compte !='') ? <tr><td className="col-1">Téléphone</td><td>: {telephone}</td><td>Compte</td><td>:<span>&nbsp;{num_compte[0]}<br/>&nbsp; {num_compte[1]} </span></td></tr> : '' }
                                {(this.state.compte !='') ? <tr><td className="col-1">Email</td><td>: {email}</td><td>Adresse Physique</td><td>: {adresse_physique}</td></tr> : '' }
                                {(this.state.compte !='') ? <tr><td className="col-1">Date de naissance</td><td>: {date_naissance}</td><td>IM</td><td>: {im}</td></tr> : '' }
                                {(this.state.compte !='') ? <tr><td className="col-1">Num. pièce d'identité</td><td>: {num_piece_identite}</td><td>Type pièce d'identité</td><td>: {type_piece_identite}</td></tr> : '' }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Repertoire_compte_organisation extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                id_national:'',
                compte     :[],
                state_msg  :''
        };
        this.id_national    = this.id_national.bind(this);
        this.search_account = this.search_account.bind(this);
    }
    async id_national(event) {
        event.preventDefault()
        this.setState({id_national:event.target.value});
    }
    async search_account(event) {
        //event.preventDefault()

        this.setState({ state_msg:'attente' });
        let data = {
            id     : 2,
            id_nat : this.state.id_national
        },
        response_rep_part = await request_global("/adherent/rep_compte","POST",data),
        res = response_rep_part.result
        this.setState({ compte:res,state_msg:'' });
    }
    render() {
        let nom='',
            prenom='',
            post_nom='',
            sexe='',
            telephone='',
            im='',
            num_compte =[],
            num_piece_identite='',
            type_piece_identite='',
            etat_civil = '',
            name_agence ='',
            date_naissance='',
            lieu_naissance = '',
            province='',
            autorisation='',
            email='',
            rccm='',
            id_national='',
            denomination='',
            photo = '',
            adresse_physique = ''
        function agence(code_agence) {
            let code_agen=''
            code_agen += code_agence
            while (code_agen.length < 4) {
                code_agen = '1'+code_agen
            } 
            return code_agen
        }
        function user_compte(code_user) {
            let code_us=''
            code_us += code_user
            while (code_us.length < 11) {
                code_us = '1'+code_us
            } 
            return code_us
        }
        function user_im(code_user) {
            let code_us=''
            code_us += code_user
            while (code_us.length < 6) {
                code_us = '0'+code_us
            } 
            return code_us
        }
        function partenaire(code_agence) {
            let code_agen=''
            code_agen += code_agence
            while (code_agen.length < 4) {
                code_agen = '0'+code_agen
            } 
            return code_agen
        }
        const { compte } = this.state,
        listCompte = compte.map(item => (
            nom = item.nom,
            prenom = item.prenom,
            post_nom = item.post_nom,
            sexe = item.sexe,
            etat_civil = item.etat,
            province = item.dn_prov,
            num_piece_identite = item.numero_piece,
            type_piece_identite = item.type_piece,
            photo = item.photo,
            telephone= item.telephone,
            im= partenaire(item.id_ag) +'-'+ user_im(item.id_us),
            num_compte.push(agence(item.id_ag) +'-'+ user_compte(item.id_cmt) +' / '+ item.tp ),
            name_agence += item.dn,
            date_naissance= item.date_naissance,
            email = item.email,
            lieu_naissance = item.lieu_naissance,
            denomination = item.denomination,
            id_national = item.id_national,
            rccm = item.rccm_f,
            autorisation = item.autorisation,
            adresse_physique = item.adresse_physique
        ))
        return (
            <div className="col-12" style={divStyle}>
                <div className="col-12">
                    <div className="card form-card" style={stylefrom}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <input value={this.state.id_national} onInput={this.id_national} placeholder="Entrer l'ID National" className="form-control" type="text" />&nbsp;&nbsp;
                                </div>
                                <div className="col-md-4">
                                    <button className="btn" onClick={this.search_account} style={blockbtn}><i className="fas fa-search"></i>&nbsp;Rechercher Compte</button>
                                </div>
                            </div>
                            {(this.state.state_msg == 'attente') ? <i id="sp" className="fas fa-spinner fa-pulse" style={spinner}></i> : '' } 
                            <br/>
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-striped" id="example">
                                    {(this.state.compte !='') ?  <tr><td className="col-1"><b>ETABLISSEMENT</b></td><td></td><td></td><td></td></tr> :'' }
                                    {(this.state.compte !='') ?  <tr><td className="col-1">Téléphone</td><td>: {telephone}</td><td className="col-1">Compte</td><td>:<span>&nbsp;{num_compte[0]}<br/></span></td></tr> :'' }
                                    {(this.state.compte !='') ?  <tr><td className="col-1">Denomination</td><td>: {denomination}</td><td>Autorisation</td><td>: <a href={'https://admin.loanmesfn.com/'+autorisation} target="blank">Document administratif</a> </td></tr> :'' }
                                    {(this.state.compte !='') ?  <tr><td className="col-1">Email</td><td>: {email}</td><td>Adresse Physique</td><td>: {adresse_physique}</td></tr> :'' }
                                    {(this.state.compte !='') ?  <tr><td className="col-1">RCCM</td><td>: {rccm}</td><td>ID National</td><td>: {id_national}</td></tr> :'' }

                                    {(this.state.compte !='') ?  <tr><td className="col-1"><br/><b>GERANT</b></td><td></td><td></td><td></td></tr> :'' }
                                    {(this.state.compte !='') ?  <tr><td className="col-1"><img style={styleimg} src={'https://admin.loanmesfn.com/'+photo} className="rounded-circle" /></td><td></td>
                                            <td colspan="2">
                                                <div className="row"><div className="col-md-4">Noms </div> <div className="col-md-8"> : {prenom} {nom} {post_nom}</div></div>
                                                <div className="row"><div className="col-md-4">Sexe </div> <div className="col-md-8"> : {sexe}</div></div>
                                                <div className="row"><div className="col-md-4">Date de naissance </div> <div className="col-md-8"> : {date_naissance}</div></div>
                                                <div className="row"><div className="col-md-4">Lieu de naissance </div> <div className="col-md-8"> : {lieu_naissance}</div></div>
                                            </td>
                                            
                                            </tr> :'' }
                                    {(this.state.compte !='') ?  <tr><td className="col-1">Type pièce identifié</td><td>: {type_piece_identite}</td><td className="col-1">Num. Pièce</td><td>: {num_piece_identite}</td></tr> :'' }
                                    {(this.state.compte !='') ?  <tr><td className="col-1">Province</td><td>: {province}</td><td> IM</td><td>: {im}</td></tr> :'' }
                                    {(this.state.compte !='') ?  <tr><td className="col-1">Email</td><td colspan="3">: {email}</td></tr> :'' }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Nouvelle_agence extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                commune     :'',
                telephone   :'',
                avenue      :'',
                quartier    :'',
                denomination:'',
                reference   :'',
                state_msg   :'',
                bol         :'',
                erreur      :[]
        };
        this.change_commune      = this.change_commune.bind(this);
        this.change_denomination = this.change_denomination.bind(this);
        this.change_num_parcelle = this.change_num_parcelle.bind(this);
        this.change_telephone    = this.change_telephone.bind(this);
        this.change_avenue       = this.change_avenue.bind(this);
        this.change_commune      = this.change_commune.bind(this);
        this.change_quartier     = this.change_quartier.bind(this);
        this.send_agence         = this.send_agence.bind(this);
    }
    change_commune(event) {
        event.preventDefault()
        this.setState({commune: event.target.value});
    }
    change_denomination(event) {
        event.preventDefault()
        this.setState({denomination: event.target.value});
    }
    change_num_parcelle(event) {
        event.preventDefault()
        this.setState({reference: event.target.value});
    }
    change_telephone(event) {
        event.preventDefault()
        this.setState({telephone: event.target.value});
    }
    change_avenue(event) {
        event.preventDefault()
        this.setState({avenue: event.target.value});
    }
    change_quartier(event) {
        event.preventDefault()
        this.setState({quartier: event.target.value});
    }
    async send_agence(event) {
        event.preventDefault()
        this.setState({
            state_msg:'',
            erreur:[]
        });
        let dataAgence = {
            denomination:this.state.denomination,
            ref_parcelle:this.state.reference,
            commune     :this.state.commune,
            telephone   :this.state.telephone,
            avenue      :this.state.avenue,
            quartier    :this.state.quartier
        },
        send_agence = await request_global("/agence/create","POST",dataAgence)
        if(send_agence.result =='r'){
            this.setState({
                state_msg   :'r',
                commune     :'',
                telephone   :'',
                avenue      :'',
                quartier    :'',
                denomination:'',
                reference   :'',
                erreur      :[],
                bol         :''
            });
        }else{
            if(send_agence.result =='deconnexion'){
                window.location.replace("https://admin.loanmesfn.com/")
            }else{
                let err = send_agence.result,
                    erreurs=[]
                for (let i = 0; i < err.length; i++) {
                    erreurs.push(err[i])
                }
                this.setState({
                    state_msg:'e',
                    erreur:erreurs
                })
            }
        }
    }
    render() { 
        return (
            <div className="col-12" style={divStyle}>
                <div className="card form-card" style={stylefrom}>
                    
                    <Msg bol={ (this.state.state_msg=='r') ? <Msg_reussite msg_reu="Agence enregistré avec succès." /> : (this.state.state_msg=='e') ? <Msg_erreur msg_err={this.state.erreur}/> : ''} />
                    
                    <div className="card-body">
                        <hr/>
                        <div className="row">
                            <Input label="Dénomination" taille="30" clas="form-control" inp={this.change_denomination} value={this.state.denomination} type="text" />
                            <Input label="Téléphone" taille="13" clas="form-control" inp={this.change_telephone} value={this.state.telephone} type="text" />
                            <Input label="Réf. Parcelle" taille="6" clas="form-control" inp={this.change_num_parcelle} value={this.state.reference} type="text" />
                            <Input label="Avenue" taille="15" clas="form-control" inp={this.change_avenue} value={this.state.avenue} type="text" />
                            <Commune change={this.change_commune} clas="form-control" value={this.state.commune} type="text" />
                            <Input label="Quartier" taille="15" inp={this.change_quartier} clas="form-control" value={this.state.quartier} type="text" /><hr/>
                        </div>
                        <hr/>
                        <div className="form-group m-b-0 text-right">
                            <button className="btn" onClick={this.send_agence} style={blockbtn}><i className="fas fa-save"></i>&nbsp;Créer Agence</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Nouvelle_approvisionnement extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                agence   :'',
                montant  :'',
                devise   :'',
                state_msg:'',
                bol      :'',
                erreur   :[]
        };
        this.agence       = this.agence.bind(this);
        this.montant      = this.montant.bind(this);
        this.devise       = this.devise.bind(this);
        this.send_monnaie = this.send_monnaie.bind(this);
    }
    agence(event) {
        event.preventDefault()
        this.setState({agence: event.target.value});
    }
    montant(event) {
        event.preventDefault()
        this.setState({montant: event.target.value});
    }
    devise(event) {
        event.preventDefault()
        this.setState({devise: event.target.value});
    }
    async send_monnaie(event) {
        event.preventDefault()

        swal("Saisir le mot de passe:", {
            content: {
                element: "input",
                attributes: {
                  placeholder: "Votre mot de passe",
                  type: "password",
                },
            },
            
            
          })
          .then(async (element) => {

            let data = {
                mdp:element
            },
            ckeck_mdp = await request_global("/utilisateur/ckeck_mdp","POST",data)
            if(ckeck_mdp.result == true){
                this.setState({
                    state_msg:'',
                    agence   :'',
                    montant  :'',
                    devise   :'',
                    erreur:[]
                });
                let dataMonnaie = {
                    agence :this.state.agence,
                    montant:this.state.montant,
                    devise :this.state.devise
                },
                send_monnaie = await request_global("/agence/create_monnaie","POST",dataMonnaie)
                if(send_monnaie.result =='r'){
                    this.setState({
                        state_msg:'r',
                        erreur   :[],
                        bol      :''
                    });
                    swal({
                        title: "Succès",
                        text: "Monnaie enregistrée avec succès.",
                        icon: "success",
                        button: false,
                    });
                }else{
                    if(send_monnaie.result =='deconnexion'){
                        window.location.replace("https://admin.loanmesfn.com/")
                    }else{
                        let err = send_monnaie.result,
                            erreurs=[]
                        for (let i = 0; i < err.length; i++) {
                            erreurs.push(err[i])
                        }
                        this.setState({
                            state_msg:'e',
                            erreur   :erreurs
                        })
                        swal({
                            title: "Erreur",
                            text: ''+erreurs,
                            icon: "error",
                            button:false
                        });
                    }
                }
            }else {
                swal({
                    title: "Erreur",
                    text: 'Mot de passe introuvable',
                    icon: "error",
                    button:false
                });
            }
            
        });
    }
    render() { 
        let res = this.props.rep_ag,
            data_agence = res.map(item => (
                <Option value={item.id} option={item.denomination } />
            ))
        return (
            <div className="col-12" style={divStyle}>
                <div className="card form-card" style={stylefrom}><br/>
                    <hr/>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Agence</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" value={this.state.agence} onChange={this.agence}>
                                            <Option value="" option="Choisir" />
                                            {data_agence}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <Input label="Montant" clas="form-control" inp={this.montant} value={this.state.montant} type="number" />
                            <Devise tail="col-sm-9" taille_devise="col-md-6" label="Devise" clas="form-control" val={this.state.devise} change={this.devise} type="text" />
                        </div>
                        <div className="form-group m-b-0 text-right">
                            <hr/>
                            <button className="btn" onClick={this.send_monnaie} style={blockbtn}><i className="fas fa-save"></i>&nbsp;Approvisionner</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Repertoire_agence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            denomination :'',
            num_residence:'',
            list_agence  :[],
            id_agence    :0,
            rue          :'',
            state_msg    :'',
            quartier     :'',
            commune      :'',
            telephone    :''
        };
        this.denomination  = this.denomination.bind(this);
        this.num_residence = this.num_residence.bind(this);
        this.rue           = this.rue.bind(this);
        this.quartier      = this.quartier.bind(this);
        this.commune       = this.commune.bind(this);
        this.telephone     = this.telephone.bind(this);
        this.update_agence = this.update_agence.bind(this);
        this.modifier      = this.modifier.bind(this);
    }
    denomination(event) {
        event.preventDefault()
        this.setState({denomination: event.target.value});
    }
    num_residence(event) {
        event.preventDefault()
        this.setState({num_residence: event.target.value});
    }
    rue(event) {
        event.preventDefault()
        this.setState({rue: event.target.value});
    }
    quartier(event) {
        event.preventDefault()
        this.setState({quartier: event.target.value});
    }
    commune(event) {
        event.preventDefault()
        this.setState({commune: event.target.value});
    }
    telephone(event) {
        event.preventDefault()
        this.setState({telephone: event.target.value});
    }
    async modifier(event) {
        //event.preventDefault()

        $('#exampleModal4').modal('hide');
        this.setState({ state_msg:'' });

        let data = {
                id : event.target.getAttribute('data-id')
            },
            res_agence = await request_global("/agence/on_agence","POST",data),
            res        = res_agence.result,
            solde      = await request_global("/agence/solde_agence","POST",data)

        if(res =='deconnexion' || solde.result =='deconnexion')  window.location.replace("https://admin.loanmesfn.com/")
        
        res.map(item => (
            this.setState({
                denomination :item.denomination,
                num_residence:item.numero_parcel,
                id_agence    :item.id,
                rue          :item.avenue,
                quartier     :item.quartier,
                commune      :item.commune,
                telephone    :item.telephone
            }),
            document.querySelector('.commune').value = item.commune
        )) 
        this.setState({
            solde_cdf : (solde.result1==null) ? 0 : parseFloat(solde.result1).toFixed(2),
            solde_usd : (solde.result2==null) ? 0 : parseFloat(solde.result2).toFixed(2),
            solde_eur : (solde.result2==null) ? 0 : parseFloat(solde.result3).toFixed(2)
        })
        if(res !='' && solde.result !='') $('#exampleModal4').modal('show');         
    }
    async update_agence(event) {
        event.preventDefault()
        this.setState({
            id_agence: event.target.value,
            state_msg:''
        });
        let data = {
            denomination: this.state.denomination,
            ref_parcelle: this.state.num_residence,
            commune     : this.state.commune,
            telephone   : this.state.telephone,
            avenue      : this.state.rue,
            quartier    : this.state.quartier,
            id          : this.state.id_agence
        },
        send = await request_global("/agence/update","POST",data),
        res = send.result
        if(res == 'r'){
            this.setState({
                state_msg:'r'
            });
            $('#exampleModal4').modal('hide');
        }else{
            if(res =='deconnexion'){
                window.location.replace("https://admin.loanmesfn.com/")
            }else{
                let err = send.result,
                    erreurs=[]
                for (let i = 0; i < err.length; i++) {
                    erreurs.push(err[i])
                }
                this.setState({
                    state_msg:'e',
                    erreur   :erreurs
                })
            }
        }
    } 
    render() {
        let res = this.props.rep_ag,
            listAgence = res.map(item => (
                <Tableau_agence numero={item.id} denomination={item.denomination} telephone={item.telephone} commune={item.commune} rue={item.avenue} quartier={item.quartier} action={<Action_agence data_id={item.id} clc={this.modifier} style={blockbtn} target="#exampleModal4" />}/>
            ))
        return (
            <div className="col-12" style={divStyle}>
                <div className="col-12">
                    <div className="card form-card" style={stylefrom}>
                        <div className="card-body" >
                            <table className="table table-striped" id="example">
                                <thead style={styleentete}>
                                    <Cellule_tableau label="N°" />
                                    <Cellule_tableau label="Dénomination" />
                                    <Cellule_tableau label="Téléphone" />
                                    <Cellule_tableau label="Commune" />
                                    <Cellule_tableau label="Quartier" />
                                    <Cellule_tableau label="Rue" />
                                    <Cellule_tableau label="Action" />
                                </thead>
                                <tbody>
                                    {listAgence}
                                </tbody>
                                <tfoot>
                                </tfoot>
                            </table>
                            <Mise_a_jour_agence 
                                msg_err = {
                                <Msg bol={ (this.state.state_msg=='r') ? <Msg_reussite msg_reu="Mise à jour effectuée succès." /> : (this.state.state_msg=='e') ? <Msg_erreur msg_err={this.state.erreur}/> : ''} />}
                                denomination ={this.denomination} denomination_v={this.state.denomination} 
                                rue          ={this.rue} rue_v={this.state.rue}
                                quartier     ={this.quartier} quartier_v={this.state.quartier}
                                commune      ={this.commune}
                                telephone    ={this.telephone} telephone_v={this.state.telephone}
                                num          ={this.num_residence} num_v={this.state.num_residence}
                                solde_cdf_v  ={this.state.solde_cdf}
                                solde_usd_v  ={this.state.solde_usd}
                                solde_eur_v  ={this.state.solde_eur}
                                update_agence={this.update_agence} value_update={this.state.id_agence}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Config_transaction extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                type_transaction       :'Depot',
                devise                 :'',
                id_config              :0,
                min                    :0,
                state_msg              :'',
                max                    :0,
                frais                  :'',
                list_config_transaction:[]
        };
        this.type_transaction = this.type_transaction.bind(this);
        this.devise           = this.devise.bind(this);
        this.rechercher       = this.rechercher.bind(this);
        this.modifier         = this.modifier.bind(this);
        this.min              = this.min.bind(this);
        this.max              = this.max.bind(this);
        this.frais            = this.frais.bind(this);
        this.update           = this.update.bind(this);
    }
    type_transaction(event) {
        event.preventDefault()
        this.setState({type_transaction: event.target.value});
    }
    devise(event) {
        event.preventDefault()
        this.setState({devise: event.target.value});
    }
    min(event) {
        event.preventDefault()
        this.setState({min: event.target.value});
    }
    frais(event) {
        event.preventDefault()
        this.setState({frais: event.target.value});
    }
    max(event) {
        event.preventDefault()
        this.setState({max: event.target.value});
    }
    async modifier(event) {
        //event.preventDefault()
        $('#exampleModal5').modal('hide');
        this.setState({state_msg:''});

        let data = {
                id : event.target.getAttribute('data-id')
            },
            on_transact = await request_global("/agence/on_transaction","POST",data),
            res = on_transact.result
        if(res =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
        res.map(item => (
            this.setState({
                min      :item.minimum,
                max      :item.maximum,
                frais    :item.frais,
                id_config:item.id
            })
        ))
        if(res !='') $('#exampleModal5').modal('show');
    }
    async update(event) {
        event.preventDefault()
        this.setState({id_config:document.querySelector('.id_config').value,state_msg:''});
        let data = {
            min   :this.state.min,
            max   :this.state.max,
            frais :this.state.frais,
            type  :this.state.type_transaction,
            devise:this.state.devise,
            id    :this.state.id_config
        },
        update_transaction = await request_global("/agence/update_transaction","POST",data)
       
        if(update_transaction.result =='r'){
            this.setState({
                state_msg:'r',
                erreur :[],
                bol    :''
            })
            $('#exampleModal5').modal('hide');
        }else{
            if(update_transaction.result =='deconnexion'){
                window.location.replace("https://admin.loanmesfn.com/")
            }else{
                let err    = update_transaction.result,
                    erreurs=[]
                for (let i = 0; i < err.length; i++) {
                    erreurs.push(err[i])
                }
                this.setState({
                    state_msg:'e',
                    erreur   :erreurs
                })
            }
        }
    }
    async rechercher(event) {
        event.preventDefault()
        let data = {
                type  :this.state.type_transaction,
                devise:this.state.devise
            },
        rep = await request_global("/agence/rep_transaction","POST",data)
        if(rep.result =='deconnexion')  window.location.replace("https://admin.loanmesfn.com/")
        this.setState({list_config_transaction: rep.result});
    }
    render() {
        const { list_config_transaction } = this.state,
            list_config_trans= list_config_transaction.map(item => (
                <Cellule_corps_tableau action={<Action_agence target="#exampleModal5" clc={this.modifier} data_id={item.id} style={stylebtnact} lien='Modifier' />} nature={(item.type=='Depot') ? 'Dépôt' : (item.type=='Retrait') ? 'Retrait' : 'Transfert'} min={item.minimum+ ' '+ item.devise} max={item.maximum+ ' '+ item.devise} frais={item.frais+ ' %'} />
            ))
        return (
            <div className="col-12" style={divStyle}>
                <div className="card form-card" style={stylefrom}>
                    <div className="card-body" >
                        <Rep_type_transaction onChange={this.type_transaction} change={this.devise} clc={this.rechercher} />
                        <table className="table table-striped" id="example">
                            <thead style={styleentete}>
                                <Cellule_tableau label="Nature" />
                                <Cellule_tableau label="Montant Minimun" />
                                <Cellule_tableau label="Montant Maximun" />
                                <Cellule_tableau label="Frais" />
                                <Cellule_tableau label="Action" />
                            </thead>
                            <tbody>
                                {list_config_trans}
                            </tbody>
                            <tfoot>
                            </tfoot>
                        </table>
                        <Mise_a_jour_config_transaction
                            msg_err={<Msg bol={ (this.state.state_msg=='e') ? <Msg_erreur msg_err={this.state.erreur}/> : ''} />}
                            minimum={this.min} minimum_v={this.state.min}
                            maximum={this.max} maximum_v ={this.state.max}
                            frais={this.frais} frais_v={this.state.frais}
                            update={this.update}
                            id_transaction={this.state.id_config}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
class Depot_usd extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                min        :'',
                max        :'',
                devise     :'',
                pourcentage:'',
                list_pource:[],
                state_msg  :'',
                erreur     :[],
                bol        :''
        };
        this.min         = this.min.bind(this);
        this.max         = this.max.bind(this);
        this.pourcentage = this.pourcentage.bind(this);
        this.send        = this.send.bind(this);
        this.devise      = this.devise.bind(this);
    }
    min(event) {
        event.preventDefault()
        this.setState({min: event.target.value});
    }
    max(event) {
        event.preventDefault()
        this.setState({max: event.target.value});
    }
    pourcentage(event) {
        event.preventDefault()
        this.setState({pourcentage: event.target.value});
    }
    devise(event) {
        event.preventDefault()
        this.setState({devise: event.target.value});
    }
    async send(event) {
        event.preventDefault()
        this.setState({
            state_msg:'',
            erreur   :[]
        });
        let dataCompte = {
            minimum:this.state.min,
            maximum:this.state.max,
            frais  :this.state.pourcentage,
            devise :this.state.devise
        },
        send_compte = await request_global("/agence/create_poucentage_depot","POST",dataCompte)
        if(send_compte.result =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
        if(send_compte.result =='r'){
            this.setState({
                min        :'',
                max        :'',
                pourcentage:'',
                devise     :'',
                state_msg  :'r',
                erreur     :[],
                bol        :''
            })
        }else{
            let err    = send_compte.result,
                erreurs=[]

            for (let i = 0; i < err.length; i++) erreurs.push(err[i])
                
            this.setState({
                state_msg:'e',
                erreur   :erreurs
            })
        }
    }
    render() {
        return (
            <div className="col-12" style={divStyle}>
                <div className="card form-card" style={stylefrom}>
                    <Msg bol={ (this.state.state_msg=='r') ? <Msg_reussite msg_reu="Configuration de dépôt enregistrée avec succès." /> : (this.state.state_msg=='e') ? <Msg_erreur msg_err={this.state.erreur}/> : ''} />
                    <div className="card-body">
                        <hr/>
                        <div className="row">
                            <Input label="Montant Minimum" inp={this.min} clas="form-control" value={this.state.min} type="number" />
                            <Input label="Montant Maximum" inp={this.max} clas="form-control" value={this.state.max} type="number" />
                            <Input min="1" max="100" label="Pourcentage" inp={this.pourcentage} clas="form-control" value={this.state.pourcentage} type="number" />
                            <Devise tail="col-sm-9" taille_devise="col-md-6" label="Devise" clas="form-control" val={this.state.devise} change={this.devise} type="text" />
                        </div><hr/>
                        <div className="form-group m-b-0 text-right">
                            <button value="Enregistrer" className="btn" onClick={this.send} style={stylebtnact}><i class="fas fa-save"></i>&nbsp;Configurer </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Configuration_generaux extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                credit         :'',
                agent          :'',
                cout           :'',
                msg            :'', 
                msg_retro      :'',
                penalite       :'',
                montant_max    :'',
                state_msg      :'',
                taux_change    :'',
                msg_taux_change:'',
                erreur         :[],
                bol            :''
        };
        this.credit      = this.credit.bind(this);
        this.agent       = this.agent.bind(this);
        this.taux_change = this.taux_change.bind(this);
        this.cout        = this.cout.bind(this);
        this.send        = this.send.bind(this);
        this.penalite    = this.penalite.bind(this);
        this.montant_max = this.montant_max.bind(this);
    }
    taux_change(event) {
        event.preventDefault()
        this.setState({
            taux_change    : event.target.value,
            msg_taux_change:'1 USD égal '+event.target.value + ',00 CDF'
        });
    }
    penalite(event) {
        event.preventDefault()
        this.setState({penalite: event.target.value});
    }
    montant_max(event) {
        event.preventDefault()
        this.setState({montant_max: event.target.value});
    }
    credit(event) {
        event.preventDefault()
        this.setState({credit: event.target.value});
    }
    agent(event) {
        event.preventDefault()
        this.setState({
            agent    : event.target.value,
            msg_retro: 'La retrocession sera la déduction de 1/ '+event.target.value + ' de frais de retrait et de frais de transfert'
        });
    }
    cout(event) {
        event.preventDefault()
        this.setState({cout: event.target.value});
    }
    async send(event) {
        event.preventDefault()
        this.setState({
            state_msg:'',
            erreur   :[]
        });
        let dataPourcentage = {
            credit     : document.querySelector('.credit').value,
            agent      : document.querySelector('.agent').value,
            cout       : document.querySelector('.im').value,
            penalite   : document.querySelector('.penalite').value,
            montant_max: document.querySelector('.montant').value,
            taux_change: document.querySelector('.taux').value
        },
        send = await request_global("/agence/send_pourcentage","POST",dataPourcentage)
        if(send.result =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
        if(send.result =='r'){
            this.setState({
                state_msg:send.result,
                erreur   :[],
                msg_retro:'',
                bol      :'',
            });
        }
    }
    render() { 
        let res = this.props.data_pourc,
            credit,
            agent,
            cout,
            penalite,
            montant_maximal,
            taux_change,
            data_credit = res.map(item => (
                credit = item.pourcentage_credit
            )),
            data_agent = res.map(item => (
                agent  = item.retrocession_agent
            )),
            data_cout = res.map(item => (
                cout  = item.prix_im
            )),
            data_penalite = res.map(item => (
                penalite  = item.penalite_remboursement
            )),
            data_montant_max = res.map(item => (
                montant_maximal  = item.montant_maximal_emprunt
            )),
            data_taux_change = res.map(item => (
                taux_change  = item.taux_change
            ))
        return (
            <div className="col-12" style={divStyle}>
                <div className="card form-card" style={stylefrom}>
                    <Msg 
                        bol={ (this.state.state_msg=='r') ? <Msg_reussite msg_reu="Configurations revues avec succès." /> : 
                        (this.state.state_msg=='repete') ? <Msg_reussite msg_reu="Aucune modification n'est effectuée." /> : 
                        (this.state.state_msg=='e') ? <Msg_erreur msg_err={this.state.erreur}/> : ''
                    } />
                    <div className="card-body">
                        <hr/>
                        <div className="row">
                            <Input label="% Crédit" plc="Pourcentage remboursement Crédit" clas="form-control credit" max="99" min="1" inp={this.credit} value={(this.state.credit == '') ? data_credit: this.state.credit } type="number" />
                            <Input label="Rétrocession Agent" plc="Rétrocession sur retrait et transfert" clas="form-control agent" max="5" min="2" inp={this.agent} value={(this.state.agent == '') ? data_agent : this.state.agent } type="number" />
                            <Input label="Coût IM" plc="Coût IM en USD" clas="form-control im" min="1" inp={this.cout} value={(this.state.cout == '') ? data_cout : this.state.cout } type="number" />
                            <Input label="% Pénalité" plc="Pénalité remboursement" clas="form-control penalite" min="1" inp={this.penalite} value={(this.state.penalite == '') ? data_penalite : this.state.penalite } type="number" />
                            <Input label="Montant Maximal" plc="Montant Maximal à emprunter" clas="form-control montant" min="1" inp={this.montant_max} value={(this.state.montant_max == '') ? data_montant_max : this.state.montant_max } type="number" />
                            <Input label="Taux de change" plc="Dollar / Franc Congolais" clas="form-control taux" min="1" inp={this.taux_change} value={ (this.state.taux_change == '') ? data_taux_change : this.state.taux_change } type="number" />
                        </div>
                        <span style={style_msg_retro}>&nbsp;&nbsp;&nbsp;{this.state.msg_retro}</span>
                        <span style={style_msg_retro}>&nbsp;&nbsp;&nbsp;{this.state.msg_taux_change}</span>
                        <hr/>
                        <div className="form-group m-b-0 text-right">
                            <button className="btn" onClick={this.send} style={blockbtn}><i className="fas fa-save"></i>&nbsp;Configurer</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Mise_a_jour_agence extends React.Component {
    render() { 
        return (
            <div className="modal fade" id="exampleModal4" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel4" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 style={style_titre_mis_a_jour} className="modal-title" id="exampleModalLabel4">MISE A JOUR DE L'AGENCE</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="modal_user">
                            <div className="row">
                                {this.props.msg_err}
                            </div>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Dénom.</label>
                                <div className="col-sm-9">
                                    <input type="text" onInput={this.props.denomination} value={this.props.denomination_v} className="form-control denomination" />
                                </div>
                            </div><br/>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Num. Rés.</label>
                                <div className="col-sm-9">
                                    <input type="text" onInput={this.props.num} value={this.props.num_v} className="form-control numero" />
                                </div>
                            </div><br/>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Rue</label>
                                <div className="col-sm-9">
                                    <input type="text" onInput={this.props.rue} value={this.props.rue_v} className="form-control rue" />
                                </div>
                            </div><br/>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Quartier</label>
                                <div className="col-sm-9">
                                    <input type="text" onInput={this.props.quartier} value={this.props.quartier_v} className="form-control quartier" />
                                </div>
                            </div><br/>
                            <Commune_update onChange={this.props.commune} />
                            <br/>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Téléphone</label>
                                <div className="col-sm-9">
                                    <input onInput={this.props.telephone} value={this.props.telephone_v} className="form-control telephone" />
                                </div>
                            </div><br/>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Solde CDF</label>
                                <div className="col-sm-9">
                                    <input disabled="true" onInput={this.props.solde_cdf} value={this.props.solde_cdf_v} className="form-control solde_cdf_v" />
                                </div>
                            </div><br/>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Solde USD</label>
                                <div className="col-sm-9">
                                    <input disabled="true" onInput={this.props.solde_usd} value={this.props.solde_usd_v} className="form-control solde_usd_v" />
                                </div>
                            </div><br/> 
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Solde EUR</label>
                                <div className="col-sm-9">
                                    <input disabled="true" onInput={this.props.solde_eur} value={this.props.solde_eur_v} className="form-control solde_eur_v" />
                                </div>
                            </div><br/>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={this.props.update_agence} value={this.props.value_update} style={blockbtn}><i className="fas fa-edit"></i>&nbsp;Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Mise_a_jour_config_transaction extends React.Component {
    render() { 
        return (
            <div className="modal fade" id="exampleModal5" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel5" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 style={style_titre_mis_a_jour} className="modal-title" id="exampleModalLabel5">MISE A JOUR DE LA CONFIGURATION</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="modal_user">
                            <div className="row">
                                {this.props.msg_err}
                            </div>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Minimum</label>
                                <div className="col-sm-9">
                                    <input type="number" onInput={this.props.minimum} value={this.props.minimum_v} className="form-control" />
                                </div>
                            </div><br/>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Maximum</label>
                                <div className="col-sm-9">
                                    <input type="number" onInput={this.props.maximum} value={this.props.maximum_v} className="form-control" />
                                </div>
                            </div><br/>
                            <div className="row">
                                <label className="col-sm-3 col-form-label">Frais</label>
                                <div className="col-sm-9">
                                    <input type="number" min="1" max="100" onInput={this.props.frais} value={this.props.frais_v} className="form-control" />
                                    <input type="hidden" value={this.props.id_transaction} className="form-control id_config" />
                                </div>
                            </div><br/>
                        </div>
                        <div className="modal-footer">
                            <button className="btn" onClick={this.props.update} style={blockbtn}><i className="fas fa-edit"></i>&nbsp;Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Lien extends React.Component {
    render() { 
        return (
            <div>
                <button type="button" className="btn" onClick={this.props.onClick} data-id={this.props.data_id} data-target={this.props.data_taget} style={this.props.style}><i className="fas fa-edit"></i>&nbsp;{this.props.lien}</button>
            </div>
        )
    }
}
class Action_agence extends React.Component {
    render() {
        return (
            <div>
                <button type="button" className="btn" onClick={this.props.clc} data-id={this.props.data_id} data-target={this.props.target} style={this.props.style}><i className="fas fa-edit"></i>&nbsp;Modifier</button>
            </div>
        )
    }
}
class Wallet_don extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                devise   :'',
                montant  :0,
                state_msg:'',
                bol      :'',
                erreur   :[]
        };
        this.devise         = this.devise.bind(this);
        this.montant        = this.montant.bind(this);
        this.send_wallet_don= this.send_wallet_don.bind(this);
    }
    devise(event) {
        event.preventDefault()
        this.setState({devise:event.target.value});
    }
    montant(event) {
        event.preventDefault()
        this.setState({montant:event.target.value});
    }
    async send_wallet_don(event) {
        event.preventDefault()
        
        let dt = { 
                val:true
            },
            erreurs   =[],
            response2 = await request_global("/agence/wallet_revenu","POST",dt)

        if(response2.result =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
            
        if(parseFloat(response2.result1) < parseFloat(this.state.montant) && this.state.devise == 'CDF') erreurs.push('Solde CDF insuffisant '+ parseFloat(response2.result1).toFixed(2))
        else{
            if(parseFloat(response2.result2) < parseFloat(this.state.montant) && this.state.devise == 'USD') erreurs.push('Solde USD insuffisant. Vous avez '+ parseFloat(response2.result2).toFixed(2))
            else{
                if(parseFloat(response2.result3) < parseFloat(this.state.montant) && this.state.devise == 'EUR') erreurs.push('Solde EUR insuffisant '+ parseFloat(response2.result3).toFixed(2))
                else{
                    let data = {
                            devise : this.state.devise,
                            montant: this.state.montant
                        },
                        response1 = await request_global("/agence/send_depot_wallet_don","POST",data)
                        
                        if(response1.result1 =='r'){
                            this.setState({
                                state_msg:'r',
                                devise   :'',
                                montant  :0, 
                                erreur   :[],
                                bol      :''
                            });
                        }else{
                            let err    = response1.result1
                            for (let i = 0; i < err.length; i++) {
                                erreurs.push(err[i])
                            }
                            this.setState({
                                state_msg:'e',
                                erreur   :erreurs
                            })
                        }
                }
            }
        }
        
        if(erreurs !=''){
            this.setState({
                state_msg:'e',
                erreur   :erreurs
            })
        }
    
        return false
    }
    render() {
        return (
            <div className="col-12" style={divStyle}>
                 <div className="card form-card" style={stylefrom}>
                    <Msg bol={ (this.state.state_msg=='r') ? <Msg_reussite msg_reu="Dépôt Wallet Don enregistré avec succès." /> : (this.state.state_msg=='e') ? <Msg_erreur msg_err={this.state.erreur}/> : ''} />
                       <div className="card-body">
                            <form method="post" onSubmit={this.send_wallet_don}>
                                <hr/>
                                <div className="row">
                                    <Input label="Montant" type="number" clas="form-control" taille="15" name="montant" value={this.state.montant} inp={this.montant} />
                                    <Devise tail="col-sm-9" taille_devise="col-md-6" label="Devise" clas="form-control" val={this.state.devise} change={this.devise} type="text" />
                                </div>
                                <hr/>
                                <div className="form-group m-b-0 text-right">
                                    <button className="btn" style={blockbtn}><i className="fas fa-save"></i>&nbsp;Déposer</button>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        )
    }
}
class Wallet_don_paiement extends React.Component {
    constructor(props) { 
        super(props);
            this.state = {
                motif    :'',
                state_msg:'',
                montant  :1,
                compte   :'',
                id_compte:'',
                devise   :''
        };
        this.motif          = this.motif.bind(this);
        this.montant        = this.montant.bind(this);
        this.devise         = this.devise.bind(this);
        this.compte         = this.compte.bind(this);
        this.send_wallet_don= this.send_wallet_don.bind(this);
    }
    compte(event) {
        event.preventDefault()

        let val = event.target.value,
            chaine1 = '',
            chaine2 = ''

        for (let i = 0; i < val.length; i++) {
            if(val[i] == '0' || val[i] == '1' || val[i] == '2' || val[i] == '3' || val[i] == '4' || val[i] == '5' || val[i] == '6' || val[i] == '7' || val[i] == '8' || val[i] == '9' ){
                chaine1 += val[i]
            }         
        }
        for (let i = 0; i < chaine1.length; i++) {
            if(i < 15) {
                if(i == 3) chaine2 += chaine1[i] + '-'
                else chaine2 += chaine1[i]  
            }  
        }
        this.setState({compte: chaine2});
    }
    motif(event) {
        event.preventDefault()
        this.setState({
            motif:event.target.value,
            annee:'',
            mois :''
        });
    }
    devise(event) {
        event.preventDefault()
        this.setState({motif:event.target.value});
    }
    montant(event) {
        event.preventDefault()
        this.setState({montant:event.target.value});
    }
    devise(event) {
        event.preventDefault()
        this.setState({devise:event.target.value});
    }
    async request(url,method,data) {
        try {
            const response = await fetch(url, {
                method: method, 
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const resultat = await response.json();
            return resultat
        }catch (erreur) {
            console.log("Erreur :", erreur);
        }
    }
    async send_wallet_don(event) {
        event.preventDefault()
        
        swal("Saisir le mot de passe:", {
            content: {
                element: "input",
                attributes: {
                  placeholder: "Votre mot de passe",
                  type: "password",
                },
            },
        })
        .then(async (element) => {
        
            let data = {
                mdp:element
            },
            ckeck_mdp = await request_global("/utilisateur/ckeck_mdp","POST",data)

            if(ckeck_mdp.result == true){
                let erreurs = []
                
                this.setState({
                    state_msg:'',
                    erreur   :[]
                });
                
                let data = { id :'' },
                    wallet_don = await request_global("/agence/wallet_don","POST",data)
                    if(wallet_don.result =='deconnexion')  window.location.replace("https://admin.loanmesfn.com/")
                    let wr_cdf = parseFloat(wallet_don.result1),
                        wr_usd = parseFloat(wallet_don.result2),
                        wr_eur = parseFloat(wallet_don.result3)
                
                if(this.state.devise == ''){
                    erreurs.push('Merci de choisir la devise')
                    this.setState({
                        state_msg:'e',
                        erreur   :erreurs
                    })
                    swal({
                        title: "Erreur",
                        text: ''+erreurs,
                        icon: "error",
                        button:false
                    });
                }else{ 
                    if(this.state.montant ==''){
                        erreurs.push('Merci de saisir le montant')
                        this.setState({
                            state_msg:'e',
                            erreur   :erreurs
                        })
                        
                        swal({
                            title: "Erreur",
                            text: ''+erreurs,
                            icon: "error",
                            button:false
                        });
                    }else{
                        if(this.state.devise == 'CDF' && this.state.motif !=3 && parseFloat(this.state.montant) > wr_cdf){
                            erreurs.push('Wallet don des CDF insuffisant')
                            this.setState({
                                state_msg:'e',
                                erreur:erreurs
                            })
                            swal({
                                title: "Erreur",
                                text: ''+erreurs,
                                icon: "error",
                                button:false
                            });
                        }
                        else{
                            if(this.state.devise == 'EUR' && this.state.motif !=3 && this.state.montant > wr_eur){
                                erreurs.push('Wallet don des EUR insuffisant')
                                this.setState({
                                    state_msg:'e',
                                    erreur:erreurs
                                })
                                swal({
                                    title: "Erreur",
                                    text: ''+erreurs,
                                    icon: "error",
                                    button:false
                                });
                            }else{
                                if(this.state.devise == 'USD' && this.state.motif !=3 && this.state.montant > wr_usd){
                                    erreurs.push('Wallet don des USD insuffisant')
                                    this.setState({
                                        state_msg:'e',
                                        erreur   :erreurs
                                    })
                                    swal({
                                        title: "Erreur",
                                        text: ''+erreurs,
                                        icon: "error",
                                        button:false
                                    });
                                }else{
                                    let data = {
                                            motif    : this.state.motif,
                                            montant  : this.state.montant,
                                            mois     : this.state.mois,
                                            devise   : this.state.devise,
                                            compte   : this.state.compte,
                                            annee    : this.state.annee,
                                            id_compte: this.state.id_compte   
                                        }, 
                                        send_paiement = await request_global("/agence/send_payement","POST",data)
                                    if(send_paiement.result ==0){
                                        this.setState({
                                            state_msg:'r',
                                            motif    :'',
                                            annee    :'',
                                            mois     :'',
                                            montant  :1,
                                            compte   :'',
                                            devise   :''
                                        });
                                        swal({
                                            title: "Succès",
                                            text: "Paiement effectué avec succès !",
                                            icon: "success",
                                            button: false,
                                        });
                                    }else{
                                        let err = send_paiement.result,
                                            erreurs=[]
                                        for (let i = 0; i < err.length; i++) {
                                            erreurs.push(err[i])
                                        }
                                        this.setState({
                                            state_msg:'e',
                                            erreur   :erreurs
                                        })
                                        swal({
                                            title: "Erreur",
                                            text: ''+erreurs,
                                            icon: "error",
                                            button:false
                                        });
                                    } 
                                }
                            }
                        }
                    }
                }
            }else {
                swal({
                    title: "Erreur",
                    text: 'Mot de passe introuvable',
                    icon: "error",
                    button:false
                });
            }
            
        });
        return false
    }
    render() {
        let res = this.props.rep_charge,
            data_charge = res.map(item => (
                <Option value={item.id} option={item.libelle } />
            ))
        return (
            <div className="col-12" style={divStyle}>
                 <div className="card form-card" style={stylefrom}>
                    <div className="card-body">
                        <form method="post" onSubmit={this.send_wallet_don}>
                            <hr/>
                            <div className="row">
                                <Input label="Montant" min="1" type="number" clas="form-control" taille="15" name="montant" value={this.state.montant} inp={this.montant} />
                                <Devise tail="col-sm-9" taille_devise="col-md-6" label="Devise" clas="form-control" val={this.state.devise} change={this.devise} type="text" />
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Motif </label>
                                        <div className="col-sm-9">
                                            <select name="Motif" value={this.state.motif} onChange={this.motif} className="form-control">
                                                <Option value="" option="Choisir" />
                                                {data_charge}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <Input disabled={(this.state.motif ==3) ? false : true} label="Num. Compte" type="text" clas="form-control" taille="16" name="compte" value={this.state.compte} inp={this.compte} />
                            </div>
                            <hr/>
                            <div className="form-group m-b-0 text-right">
                                <button className="btn" style={blockbtn}><i className="fas fa-save"></i>&nbsp;Payer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

(function wallet_revenu(){
    let wallet_revenu_cdf = document.querySelector('.wallet_revenu_cdf'),
        wallet_revenu_usd = document.querySelector('.wallet_revenu_usd'),
        wallet_revenu_eur = document.querySelector('.wallet_revenu_eur')
        
    
    $.ajax({
        url        : '/agence/wallet_revenu',
        type       : 'POST', 
        contentType: false,
        processData: false, 
        cache      : false
    })
    .done((response)=>{
        if(response.result =='deconnexion'){
            window.location.replace("https://admin.loanmesfn.com/")
        }else{
            let wr_cdf = parseFloat(response.result1),
                wr_usd = parseFloat(response.result2),
                wr_eur = parseFloat(response.result3)
                
            wallet_revenu_cdf.textContent = (isNaN(wr_cdf.toFixed(2)) ? '' : wr_cdf.toFixed(2)) + ' CDF';
            wallet_revenu_usd.textContent = (isNaN(wr_usd.toFixed(2)) ? '' : wr_usd.toFixed(2)) + ' USD';
            wallet_revenu_eur.textContent = (isNaN(wr_eur.toFixed(2)) ? '' : wr_eur.toFixed(2)) + ' EUR';
        }
    })
    .fail(function(error){
        alert('Erreur Inconnu 1')
    })
   // document.querySelector('.libelle_titre').textContent = 'TABLEAU DE BORD'
})()


let wallet_don_cdf = document.querySelector('.wallet_don_cdf'),
    wallet_don_usd = document.querySelector('.wallet_don_usd'),
    wallet_don_eur = document.querySelector('.wallet_don_eur'),
    
    chef_personnel = document.querySelector('.chef_personnel'),
    gest_credit    = document.querySelector('.gest_credit'),
    gest_compte    = document.querySelector('.gest_compte'),
    
    agence         = document.querySelector('.agence'),
    part           = document.querySelector('.partenaire'),
    
    compte_epargne = document.querySelector('.compte_epargne'),
    compte_courant = document.querySelector('.compte_courant'),
    agent_agence   = document.querySelector('.agent_agence'),
    agent_terrain  = document.querySelector('.agent_terrain'),

    membres        = document.querySelector('.membres'),
    membre_actif   = document.querySelector('.membre_actif'),
    membre_inactif = document.querySelector('.membre_inactif'),
    modifier_profil = document.querySelector('#modifier_profil')

     $.ajax({
        url        : '/agence/wallet_don',
        type       : 'POST', 
        contentType: false,
        processData: false, 
        cache      : false
    })
    .done((response)=>{
        if(response.result =='deconnexion'){
            window.location.replace("https://admin.loanmesfn.com/")
        }else{
            let wr_cdf = parseFloat(response.result1),
                wr_usd = parseFloat(response.result2),
                wr_eur = parseFloat(response.result3)
            wallet_don_cdf.textContent = (isNaN(wr_cdf.toFixed(2)) ? '' : wr_cdf.toFixed(2)) + ' CDF';
            wallet_don_usd.textContent = (isNaN(wr_usd.toFixed(2)) ? '' : wr_usd.toFixed(2)) + ' USD';
            wallet_don_eur.textContent = (isNaN(wr_eur.toFixed(2)) ? '' : wr_eur.toFixed(2)) + ' EUR';
            chef_personnel.textContent = response.cp
            gest_credit.textContent = response.gc
            gest_compte.textContent = response.prep
            agence.textContent = response.agence
            part.textContent = response.part
            compte_epargne.textContent = response.compte_epargne
            compte_courant.textContent = response.compte_courant
            agent_agence.textContent = response.agent_agence
            agent_terrain.textContent = response.agent_terrain

            membres.textContent = response.membres
            membre_actif.textContent = response.membre_actif
            membre_inactif.textContent = response.membre_inactif
        }
    })
    .fail(function(error){
        alert('Erreur Inconnu 2')
    })

let membre                  = document.querySelector('.nouveau_membre'),
    partenaire              = document.querySelector('.nouveau-partenaire'),
    personnel               = document.querySelector('.rep_personnel'),
    rep_partenaire          = document.querySelector('.repertoire-partenaire'),
    new_compte              = document.querySelector('.nouveau-compte'),
    rep_compte              = document.querySelector('.repertoire-compte'),
    rep_compte_organisation = document.querySelector('.repertoire-compte-organisation'),
    contenaire              = document.querySelector('.corps'),
    new_agence              = document.querySelector('.nouvelle-agence'),
    rep_agence              = document.querySelector('.repertoire-agence'),
    retrait_usd             = document.querySelector('.retrait_usd'),
    depot_usd               = document.querySelector('.depot_usd'),
    pourcentage             = document.querySelector('.pourcentage'),
    depot_wallet_don        = document.querySelector('.depot_wallet_don'),
    nouvelle_app            = document.querySelector('.appro_monnaie'),
    paiement_wallet_don     = document.querySelector('.paiement_wallet_don'),
    msg_err                 = document.querySelector('.msg_err')
  
/* DEBUT DEPOT WALLET */

modifier_profil.addEventListener('click',async (e)=>{
    e.preventDefault()
    msg_err.textContent=''
    let data_profil = {
        adresse_electronique:document.querySelector('#adresse_electronique').value,
        adresse_physique    :document.querySelector('.adresse_physique').value,
        telephone           :document.querySelector('#telephone').value
    },
    profil_user = await request_global("/personnel/profil_user","POST",data_profil),
    res_profil = profil_user.result
    if(res_profil == 'r') $('#profilModal').modal('hide');
    msg_err.textContent = (res_profil[0] !='r') ? res_profil[0] : ''

},false) 

paiement_wallet_don.addEventListener('click',async (e)=>{
    e.preventDefault()
    contenaire.innerHTML = ''
    document.querySelector('.libelle_titre').textContent = 'PAIEMENT'
    
    let response_rep_charge = await request_global("/agence/rep_charge","POST",{}),
        res = response_rep_charge.result
        
    if(res =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
        
    let root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Wallet_don_paiement rep_charge={res} />);
},false)  

depot_wallet_don.addEventListener('click',async (e)=>{
    e.preventDefault()
    contenaire.innerHTML = ''
    document.querySelector('.libelle_titre').textContent = 'APPROVISIONNEMENT DU WALLET DON'
    let root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Wallet_don />);
},false)

/* DEBUT POURCENTAGE */

pourcentage.addEventListener('click',async (e)=>{
    e.preventDefault()
    contenaire.innerHTML = '<div class="row"><i class="fas fa-spinner fa-pulse" style="color:#ff6600;font-size:100px;margin-top:170px;margin-left:490px;"></i></div>'
    document.querySelector('.libelle_titre').textContent = 'CONFIGURATION GENERALE'
    
    let send_compte = await request_global("/agence/select_poucentage_depot","POST",{}),
        res = send_compte.result
    if(send_compte.result =='deconnexion')  window.location.replace("https://admin.loanmesfn.com/")
    let root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Configuration_generaux data_pourc={res} />);
},false)   

/* FIN POURCENTAGE */

/* DEBUT TRANSACTION */ 

depot_usd.addEventListener('click',async (e)=>{
    e.preventDefault()
    contenaire.innerHTML = ''
    document.querySelector('.libelle_titre').textContent = 'CONFIGURATION DES DEPÔTS'
    let data = {
        type  :'Depot',
        devise:'USD'
    },
        rep = await request_global("/agence/rep_transaction","POST",data),
        res = rep.result
        if(res =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
        let listTransfert = res.map(item => (
            <Cellule_corps_tableau min={item.minimum+ ' USD'} max={item.maximum+ ' USD'} frais={item.frais+ ' %'} />
        )), 
        root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Depot_usd tab={listTransfert}/>);
},false)
retrait_usd.addEventListener('click',async (e)=>{
    e.preventDefault()
    contenaire.innerHTML = ''
    document.querySelector('.libelle_titre').textContent = 'CONFIGURATION DES TRANSACTIONS'
    let root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Config_transaction />);
},false)

/* FIN TRANSACTION */ 

/* REPERTOIRE DES COMPTES */ 
rep_agence.addEventListener('click',async (e)=>{
    e.preventDefault()
     contenaire.innerHTML = '<div class="row"><i class="fas fa-spinner fa-pulse" style="color:#ff6600;font-size:100px;margin-top:170px;margin-left:490px;"></i></div>'
    document.querySelector('.libelle_titre').textContent = 'REPERTOIRE DES AGENCES'
    let response_rep_agence = await request_global("/agence/repertoire","POST",{}),
        res = response_rep_agence.result
    if(res =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
        
    let root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Repertoire_agence rep_ag={res} />);
},false)

/* NOUVEAU AGENCE */
new_agence.addEventListener('click',(e)=>{
    e.preventDefault()
    document.querySelector('.libelle_titre').textContent = 'NOUVELLE AGENCE'
    contenaire.innerHTML = ''
    const root = ReactDOM.createRoot(document.querySelector('.corps')); 
    root.render(<Nouvelle_agence />);
},false)

/* NOUVEAU APPROVISIONNEMENT */
nouvelle_app.addEventListener('click',async(e)=>{
    e.preventDefault()
     contenaire.innerHTML = '<div class="row"><i class="fas fa-spinner fa-pulse" style="color:#ff6600;font-size:100px;margin-top:170px;margin-left:490px;"></i></div>'
    document.querySelector('.libelle_titre').textContent = 'NOUVEL APPROVISIONNEMENT'
    
    let response_rep_agence = await request_global("/agence/repertoire","POST",{}),
        res = response_rep_agence.result
    if(res =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
    const root = ReactDOM.createRoot(document.querySelector('.corps')); 
    root.render(<Nouvelle_approvisionnement rep_ag={res} />);
},false)

/* REPERTOIRE DES COMPTES MEMBRE */ 
rep_compte.addEventListener('click',async (e)=>{
    e.preventDefault()
    contenaire.innerHTML = '<div class="row"><i class="fas fa-spinner fa-pulse" style="color:#ff6600;font-size:100px;margin-top:170px;margin-left:490px;"></i></div>'
    document.querySelector('.libelle_titre').textContent = 'RECHERCHE D\'UN COMPTE MEMBRE'

    let root = ReactDOM.createRoot(document.querySelector('.corps')),
        res_type_piece_identite = await request_global("/agence/rep_type_piece","POST",{}),
        res_type_piece = res_type_piece_identite.result 
        
    if(res_type_piece =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
    root.render(<Repertoire_compte_membre piece={res_type_piece} />);
},false)

/* REPERTOIRE DES COMPTES DES ORGANISATIONS */ 
rep_compte_organisation.addEventListener('click',async (e)=>{
    e.preventDefault()
    contenaire.innerHTML = ''
    document.querySelector('.libelle_titre').textContent = 'RECHERCHE D\'UN COMPTE PARTENAIRE'

    let res_type_piece_identite = await request_global("/agence/rep_type_piece","POST",{}),
        res_type_piece = res_type_piece_identite.result,
        root = ReactDOM.createRoot(document.querySelector('.corps'))
    root.render(<Repertoire_compte_organisation piece={res_type_piece} />);
},false)

/* NOUVEAU COMPTE */
new_compte.addEventListener('click',async(e)=>{
    e.preventDefault()
    
    contenaire.innerHTML = '<div class="row"><i class="fas fa-spinner fa-pulse" style="color:#ff6600;font-size:100px;margin-top:170px;margin-left:490px;"></i></div>'
    document.querySelector('.libelle_titre').textContent = 'NOUVEAU COMPTE'
   
    let res_type_piece_identite = await request_global("/agence/rep_type_piece","POST",{}),
        res_type_piece = res_type_piece_identite.result   
    if(res_type_piece =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
     contenaire.innerHTML = '<div class="row"><i class="fas fa-spinner fa-pulse" style="color:#ff6600;font-size:100px;margin-top:170px;margin-left:490px;"></i></div>'
    const root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Nouveau_compte piece={res_type_piece} />);
},false)

/* NOUVEL UTILISATEUR */
membre.addEventListener('click',async(e)=>{
    e.preventDefault()

    contenaire.innerHTML = '<div class="row"><i class="fas fa-spinner fa-pulse" style="color:#ff6600;font-size:100px;margin-top:170px;margin-left:490px;"></i></div>'
    document.querySelector('.libelle_titre').textContent = 'NOUVEAU UTILISATEUR'

    let response_rep_agence = await request_global("/agence/repertoire","POST",{}),
        res = response_rep_agence.result
    
    if(res =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")

    let listAgence = res.map(item => (
            <Option value={item.id} option={item.denomination}/>
        ))

    let res_membre              = await request_global("/agence/rep_province","POST",{}),
        res_m                   = res_membre.result,
        res_type_piece_identite = await request_global("/agence/rep_type_piece","POST",{}),
        res_type_piece          = res_type_piece_identite.result,
        res_type_membre         = await request_global("/agence/rep_type_membre","POST",{}),
        res_                    = res_type_membre.result,
        res_2                   = res_type_membre.result2,
        res_etat_civil          = await request_global("/agence/rep_etat_civil","POST",{}),
        res_etat                = res_etat_civil.result

    if(res_membre.result =='deconnexion')  window.location.replace("https://admin.loanmesfn.com/")

    const root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Membre etat_civil={res_etat} agence={listAgence} type_piece={res_type_piece} province={res_m} type_membre={res_} type_membre2={res_2} />);
},false)

/* NOUVEAU PARTENAIRE */ 
partenaire.addEventListener('click',async(e)=>{
    e.preventDefault()
    contenaire.innerHTML = '<div class="row"><i class="fas fa-spinner fa-pulse" style="color:#ff6600;font-size:100px;margin-top:170px;margin-left:490px;"></i></div>'
    document.querySelector('.libelle_titre').textContent = 'NOUVEAU PARTENAIRE'
    
    let res_type_piece_identite = await request_global("/agence/rep_type_piece","POST",{}),
    res_type_piece = res_type_piece_identite.result
    if(res_type_piece =='deconnexion')  window.location.replace("https://admin.loanmesfn.com/")
    const root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Partenaire piece={res_type_piece} />);
},false)

/* REPERTOIRE DES PERSONNEL */  
personnel.addEventListener('click',async (e)=>{
    e.preventDefault()
     contenaire.innerHTML = ''
     document.querySelector('.libelle_titre').textContent = 'REPERTOIRE DES UTILISATEURS'
    
    const root = ReactDOM.createRoot(document.querySelector('.corps')),
          res_type_piece_identite = await request_global("/agence/rep_type_piece","POST",{}),
          res_type_piece = res_type_piece_identite.result
    if(res_type_piece =='deconnexion')  window.location.replace("https://admin.loanmesfn.com/")
    root.render(<Repertoire_personnel piece={res_type_piece} />);
},false)

/* REPERTOIRE DES PARTENAIRES ET ORGANISATIONS */ 
rep_partenaire.addEventListener('click',async (e)=>{
    e.preventDefault() 
     contenaire.innerHTML = '<div class="row"><i class="fas fa-spinner fa-pulse" style="color:#ff6600;font-size:100px;margin-top:170px;margin-left:490px;"></i></div>'
    document.querySelector('.libelle_titre').textContent = 'REPERTOIRE DES PARTENAIRE'

    let dataPertenaire = {
            rep:true
        },
        response_rep_part = await request_global("/partenaire/find_gerant","POST",dataPertenaire),
        res = response_rep_part.reponse
    if(response_rep_part.result =='deconnexion') window.location.replace("https://admin.loanmesfn.com/")
    let root = ReactDOM.createRoot(document.querySelector('.corps'));
    root.render(<Repertoire_partenaire tab={res} />);
},false)

function changerstatut(s){
    s.setAttribute('data-statut','c')
}
async function check_statut(){
    let stat = document.getElementById('statut_user')
    if(stat.getAttribute('data-statut') == 'c') stat.setAttribute('data-statut','d')
    else{
        await request_global("/deconnexion","POST",{})
        window.location.replace("https://admin.loanmesfn.com/")
    }
}
setInterval(check_statut,300000) // 5 min