
$(document).ready(function(){
			

	musicas = JSON.parse(localStorage.getItem('tabelaMusica'));
	// cadastra as músicas pré-selecionadas
	if((typeof musicas == "undefined" || musicas == null)){
		if (musicas == null) {
			var musicas = new Array();
		}
		var musica = new Object();
		var musica1 = new Object();
		var musica2 = new Object();
		var musica3 = new Object();
		var musica4 = new Object();
		musica.capa = 'https://images.genius.com/2a32de5f17d0cbdbabeb576ff9797a6d.900x900x1.jpg';
		musica.nome = 'Você não ama ninguém';
		musica.artista = 'Pineapple - Knust | Cesar Mc | Chris | Xamã';
		musica.ano = '2020';
		musica.escolha = 'RAP';
		musica.letra = 'Letra mágica';
		musica.url = 'https://www.youtube.com/watch?v=KEhhGLcqOx4'
		musicas.push(musica); //primeira música pré-cadastrada adicionada ao catágo
		musica1.capa = 'https://e-cdns-images.dzcdn.net/images/cover/1a7bbe4434bb38821b20c96cfa1c35d7/350x350.jpg';
		musica1.nome = 'Lost In Japan';
		musica1.artista = 'Shawn Mendes';
		musica1.ano = '2018';
		musica1.escolha = 'POP';
		musica1.letra = 'Letra mágica 2';
		musica1.url = 'https://www.youtube.com/watch?v=SAWzXkV3hHo'
		musicas.push(musica1); //segunda música adicionada pré-cadastrada ao catágo
		musica2.capa = 'https://studiosol-a.akamaihd.net/uploadfile/letras/albuns/5/1/6/c/37541441134296.jpg';
		musica2.nome = 'The Scientist';
		musica2.artista = 'Coldplay';
		musica2.ano = '2002';
		musica2.escolha = 'Rock';
		musica2.letra = 'Letra mágica 3';
		musica2.url = 'https://www.youtube.com/watch?v=RB-RcX5DS5A'
		musicas.push(musica2); //terceira música adicionada pré-cadastrada ao catágo
		musica3.capa = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwpPvGav6O2ZLckk1OLk3w3mBolhvUbhGNdVSX-yhP3DW7HHOTAD0XtW-MNyKHESSq2bQzlE4Fn-mflAezgJa4ZmZZYcIVDKCXzQ&usqp=CAU&ec=45732300';
		musica3.nome = 'Anunciação';
		musica3.artista = 'Alceu Valença';
		musica3.ano = '1983';
		musica3.escolha = 'MPB';
		musica3.letra = 'Letra mágica 4';
		musica3.url = 'https://www.youtube.com/watch?v=OR74idpsweg'
		musicas.push(musica3); //quarta música adicionada pré-cadastrada ao catágo
		musica4.capa = 'https://i.ytimg.com/vi/SNlS2sfI11g/maxresdefault.jpg';
		musica4.nome = 'Bilhetes';
		musica4.artista = 'Tiago Iorc';
		musica4.ano = '2019';
		musica4.escolha = 'MPB';
		musica4.letra = 'Letra mágica 5';
		musica4.url = 'https://www.youtube.com/watch?v=SNlS2sfI11g'
		musicas.push(musica4); //quinta música adicionada pré-cadastrada ao catágo
		localStorage.setItem('tabelaMusica', JSON.stringify(musicas))
	}

	//pegando a url da página que está chamando
	var url_atual = window.location.href;
	
	//adicionando conteúdos na tabela principal
	if(url_atual.indexOf('musica.html') != -1 || url_atual.indexOf('index.html') != -1){
		$html=createTableWithNewContent(musicas);
		$("#repo-list").prepend($html);
		if(url_atual.indexOf('index.html') != -1){
			$html2=createTableWithTopFiveContent(musicas);
			$("#repo-list-top-5").prepend($html2);
			$html3=createTableWithAvailableContent(musicas);
			$("#repo-list-avaliable").prepend($html3);
		}
	}else if(url_atual.indexOf('reproduzir.html') != -1){
		generatorPageMusic(musicas);
	}

	var tabelaMusica = $('#tabelaMusica').DataTable();
	
	    $('#tabelaMusica').on('click', 'a.editar', function (e) {
        e.preventDefault();
		
			var musica = tabelaMusica.row( $(this).parents('tr') ).data();
			
			var musicas = JSON.parse(localStorage.getItem('tabelaMusica'));
			
			var posicao = 0;
			
			for (var indice=0; indice < musicas.length; indice++) {
				if (musicas[indice].nome == musica.nome) {
					posicao= indice;
				} 
			}		
			
			musicas.splice(posicao, 1);
			
			localStorage.setItem('tabelaMusica', JSON.stringify(musicas));	
		
		
		var musica = tabelaMusica.row( $(this).parents('tr') ).data();
		
		localStorage.setItem('formularioMusica', JSON.stringify(musica));
		
		$(location).attr('href', 'cadastrarmusica.html');
    } );
	
	$('#tabelaMusica').on('click', 'a.excluir', function (e) {
        e.preventDefault();
		
		if (confirm("Confirma a exclusão do registro?") == true) {
		
			var musica = tabelaMusica.row( $(this).parents('tr') ).data();
			
			var musicas = JSON.parse(localStorage.getItem('tabelaMusica'));
			
			var posicao = 0;
			
			for (var indice=0; indice < musicas.length; indice++) {
				if (musicas[indice].nome == musica.nome) {
					posicao= indice;
				} 
			}		
			
			musicas.splice(posicao, 1);
			
			localStorage.setItem('tabelaMusica', JSON.stringify(musicas));			
			
			$(location).attr('href', 'musica.html');		
		
		} 
    } );

	$('#botaoNovo').on('click', function (e) {
        e.preventDefault();
		
		var musica = new Object();
		
		musica.codigo = null;
		musica.nome = "";
		musica.preco = "";
		
		localStorage.setItem('formularioMusica', JSON.stringify(musica));
		
		$(location).attr('href', 'cadastrarmusica.html');			
	});
	
	$('select').material_select();

	$("#excluir").click(function() {
		let vetContent = JSON.parse(localStorage.getItem('tabelaMusica'));
	    let musicaSelecionada = JSON.parse(localStorage.getItem('musicaSelecionada'));
	    let index = 0;
	    if(vetContent.length > 5){
		    if(!((typeof vetContent == "undefined" || vetContent == null) && (musicaSelecionada != 0 && musicaSelecionada != 1 && musicaSelecionada != 2)
		        && (typeof musicaSelecionada == "undefined" || musicaSelecionada == null)) ){
		        let have = false;
		        for (let i = vetContent.length - 1; i >= 0; i--) {
		            if(vetContent[i]['nome']==musicaSelecionada){
		                index = i;
		                have = true;
		            }
		        }
		        if(have){
		            let exclude = vetContent[index];
		            vetContent.splice(vetContent.indexOf(exclude), 1);
		            localStorage.setItem('tabelaMusica', JSON.stringify(vetContent));
		            alert('Excluido com sucesso');
		            $(location).attr('href', 'musica.html');
		        }
		    }
		}else{
			alert('Não foi possível excluir. Limite minimo de músicas cadastradas');
		}
	});

	function createTableWithNewContent(vetContent){
		
		$html = '';
		if(!(typeof vetContent == "undefined" || vetContent == null)){
			for (var i = vetContent.length - 1; i >= 0; i--) {
				$html += '<section class="flex-container" id="clicavel" onclick="executaAcao(\''+vetContent[i]['nome']+'\')">'+
		            '<div class="flex-item1">'+
		            '    <img src="'+vetContent[i]['capa']+'"/>'+
		            '</div>'+
		            '<div class="flex-item2">'+
		            '    <strong>  '+vetContent[i]['nome']+'  </strong>'+
		            '    <p>'+vetContent[i]['artista']+'</p> '+
		            '</div>'+
		            '<div class="flex-item3">'+
		            '    <p> '+vetContent[i]['ano']+'</p>'+
		            '    <p> '+vetContent[i]['escolha']+' </p>'+ 
		            '</div>'+       
		        '</section>';
		    }
		}

	    return $html;
	}

	//For available songs
	function createTableWithAvailableContent(vetContent){
		
		$html = '';
		$cont = 0;
		if(!(typeof vetContent == "undefined" || vetContent == null)){
			for (var i = 0; i < vetContent.length; i++) {
				if($cont <= 2){
					$html += '<section class="flex-container" id="clicavel" onclick="executaAcao(\''+vetContent[i]['nome']+'\')">'+
			            '<div class="flex-item1">'+
			            '    <img src="'+vetContent[i]['capa']+'"/>'+
			            '</div>'+
			            '<div class="flex-item2">'+
			            '    <strong>  '+vetContent[i]['nome']+'  </strong>'+
			            '    <p>'+vetContent[i]['artista']+'</p> '+
			            '</div>'+
			            '<div class="flex-item3">'+
			            '    <p> '+vetContent[i]['ano']+'</p>'+
			            '    <p> '+vetContent[i]['escolha']+' </p>'+ 
			            '</div>'+       
			        '</section>';
			    }
		        $cont++;
		    }
		}

	    return $html;
	}

	//For available songs
	function createTableWithTopFiveContent(vetContent){
		
		$html = '';
		if(!(typeof vetContent == "undefined" || vetContent == null)){
			for (var i = 0; i < 5; i++) {
				$html += '<section class="flex-container" id="clicavel" onclick="executaAcao(\''+vetContent[i]['nome']+'\')">'+
		            '<div class="flex-item1">'+
		            '    <img src="'+vetContent[i]['capa']+'"/>'+
		            '</div>'+
		            '<div class="flex-item2">'+
		            '    <strong>  '+vetContent[i]['nome']+'  </strong>'+
		            '    <p>'+vetContent[i]['artista']+'</p> '+
		            '</div>'+
		            '<div class="flex-item3">'+
		            '    <p> '+vetContent[i]['ano']+'</p>'+
		            '    <p> '+vetContent[i]['escolha']+' </p>'+ 
		            '</div>'+       
		        '</section>';	
		    }
		}

	    return $html;
	}

	function generatorPageMusic(vetContent){
		let musicaSelecionada = JSON.parse(localStorage.getItem('musicaSelecionada'));
		if(!(typeof vetContent == "undefined" || vetContent == null)){
			let index = 0;
			let have = false;
			//Procurar indice
			for (var i = vetContent.length - 1; i >= 0; i--) {
				if(vetContent[i]['nome']==musicaSelecionada){
					index = i;
					have = true;
				}
			}
			if(have){
				addContent(vetContent[index]["capa"], vetContent[index]["nome"], vetContent[index]["artista"], vetContent[index]["ano"],
				vetContent[index]["escolha"], vetContent[index]["letra"], vetContent[index]["url"]);
			}
		}
	}

	function addContent(capa, nome, artista, ano, escolha, letra, url){
		$('#capa-img img').attr("src", capa);
		$('#capa-name').html(nome);
		$('#artista').html(artista);
		$('#ano').html(ano);
		$('#genero').html(escolha);
		$('#letra').html(letra);
		$("#link-yt").attr('src',url.replace("watch?v=","embed/"));
  	}
	
});	