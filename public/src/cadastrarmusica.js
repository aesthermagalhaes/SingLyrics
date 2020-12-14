

$(document).ready(function () {

	var musica = JSON.parse(localStorage.getItem('formularioMusica'));
	$('#capa').val(musica.capa);
	$('#nome').val(musica.nome);
	$('#artista').val(musica.artista);
	$('#ano').val(musica.ano);
	$('#escolha').val(musica.escolha);
	$('#letra').val(musica.letra);
	$('#url').val(musica.url);
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

function salvar() {

	musicas = JSON.parse(localStorage.getItem('tabelaMusica'));
	if (musicas == null) {
		var musicas = new Array();
	}

	var fReader = new FileReader();
	var newimg= document.getElementById('capa').files[0];

	fReader.readAsDataURL(newimg);
	fReader.onloadend = function (event) {
		var musica = new Object();

		musica.capa = event.target.result;
		musica.nome = $('#nome').val();
		musica.artista = $('#artista').val();
		musica.ano = $('#ano').val();
		musica.escolha = $('#escolha').val();
		musica.letra = $('#letra').val();
		musica.url = $('#url').val();
		var aux;

		for (var posicao = 0; posicao < musicas.length; posicao++) {
			if (musica.nome == musicas[posicao].nome) {
				var aux1 = 1;
			}
		}

		if (aux1 == 1) {
			alert('Musica já cadastrada! Verifique e digite novamente');
			document.getElementById('nome').value = "";

		}


		if (aux != 1 && aux1 != 1) {
			musicas.push(musica)

			localStorage.setItem('tabelaMusica', JSON.stringify(musicas));

			$(location).attr('href', 'musica.html');
		}
	}

}

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

			capa: {
				required: "Favor preencher o campo capa",
			}
		},
		submitHandler: salvar,
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