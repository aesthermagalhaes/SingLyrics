$(document).ready(function () {
    $('select').material_select();
    $("select[required]").css({position: 'absolute', display: 'inline', height: 0, padding: 0, width: 0});
	//verifica se existe música a ser editada
	var vetContent = JSON.parse(localStorage.getItem('tabelaMusica'));
	var musicaSelecionada = JSON.parse(localStorage.getItem('musicaSelecionada'));
	var index = 0;
	if(!((typeof vetContent == "undefined" || vetContent == null) && (musicaSelecionada != 0 && musicaSelecionada != 1 && musicaSelecionada != 2)
		&& (typeof musicaSelecionada == "undefined" || musicaSelecionada == null)) ){
		var have = false;
		for (var i = vetContent.length - 1; i >= 0; i--) {
			if(vetContent[i]['nome']==musicaSelecionada){
				index = i;
				have = true;
			}
		}
		if(have){
			carregarDados(vetContent[index]);
			$('#index').val(index);
		}
	}else{
		location.href = 'index.html';
	}
});


function novaimg() {
	var capa = document.getElementById('capa').files[0];
	var fReader = new FileReader();
	fReader.readAsDataURL(capa);
	fReader.onloadend = function (event) {
		var img = document.getElementById("capa-img");
		img.src = event.target.result;
	}
}

function carregarDados(dados) {
	document.getElementById('nome').value = dados['nome'];
	document.getElementById('artista').value = dados['artista'];
	document.getElementById('ano').value = dados['ano'];
	$('#escolha').val(dados['escolha']);
	document.getElementById('letra').value = dados['letra'];
	document.getElementById('url').value = dados['url'];
}

function editar() {

	musicas = JSON.parse(localStorage.getItem('tabelaMusica'));

	var fReader = new FileReader();
	var newimg= document.getElementById('capa').files[0];
	var index = $('#index').val();

	fReader.readAsDataURL(newimg);
	fReader.onloadend = function (event) {
		musicas[index]["capa"] = event.target.result;
		musicas[index]["nome"] = $('#nome').val();
		musicas[index]["artista"] = $('#artista').val();
		musicas[index]["ano"] = $('#ano').val();
		musicas[index]["escolha"] = $('#escolha').val();
		musicas[index]["letra"] = $('#letra').val();
		musicas[index]["url"] = $('#url').val();

		localStorage.setItem('tabelaMusica', JSON.stringify(musicas));
		alert('Salvo com sucesso');
		$(location).attr('href', 'musica.html');
	}
}

$("form").submit(function (event) {
	editar();
});

$(document).ready(function () {
	$('#ano').mask('0000');
});

$("#formularioMusica").validate(
	{
		rules: {
			ano: {
				required: true,
				minlength: 4,
				min: 1960,
				max: 2020,


			},
			artista: {
				required: true
			},
			capa: {
				required: true
			},

			escolha: {
				required: true
			},

			letra: {
				required: true
			},

			nome: {
				required: true
			},

			url: {
				required: true
			}


		},
		messages: {
			ano: {
				required: "Favor preencher campo o Codigo",
				minlength: "O ano deve conter 4 algarismos, ser maior que 1990"
			},
			artista: {
				required: "Favor preencher o campo Artisra",
			},
			nome: {
				required: "Favor preencher o campo Nome",
			},

			escolha: {
				required: "Favor preencher o campo Escolha",
			},

			letra: {
				required: "Favor preencher o campo Letra",
			},

			url: {
				required: "Favor preencher o campo Url",

			},
			capa: {
				required: "Favor preencher o campo capa",
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			var placement = $(element).data('error');
			if (placement) {
				$(placement).append(error)
			} else {
				error.insertAfter(element);
			}
		}
	}
);