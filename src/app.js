
var Game = function(width, height, blockSize){
	this.screen = document.getElementById("screen");
	this.ctx = this.screen.getContext('2d');
    this.width = width;
    this.height = height;
    this.interval = [];
    this.test = 100;
   

	this.init = function(){
		
		this.screen.width= this.width;
		this.screen.height= this.height;
		this.width_el = this.width/blockSize;
		this.height_el = this.height/blockSize;
		this.drawBlocks();
	};

	this.drawBlocks = function(){
		this.ctx.fillStyle = "#900";
		for(var i = 0; i < this.height; i = i +20){
			for(var j = 0; j < this.width; j = j+20){
				this.ctx.fillRect(j,i,20,20);
				this.ctx.strokeRect(j,i,20,20);
			}
		}
	};

	this.paintBlock = function(coordinatesX, coordinatesY, color){
		this.ctx.fillStyle = color;
		this.ctx.fillRect(coordinatesX,coordinatesY,20,20);
		this.ctx.strokeRect(coordinatesX,coordinatesY,20,20);
		
	};

	this.clearRow = function(pos){
		for(var i = 0; i < this.width; i = i + 20){
			this.paintBlock(i, pos, "#900");
		}

	}

	this.animateRowUp = function(row, last, time, pos){
		var desc = 380,
			that = this,
			row_length = row.length;
		var id = setInterval(function(){
			if(row[0][0] != -1){
				var i,j = 0;
				if(desc >= 0){
					that.clearRow(desc);
					for(i = 0; i < row_length;i++){
						
						that.paintBlock(row[i][0], desc, "#c00");
					}
					
					desc = desc - 20;
				}
				else{
					for(j = 0; j < row_length;j++){
						that.paintBlock(row[j][0], 0, "#900");
					}
					clearInterval(that.interval.shift());
				}
			}else{
				if(desc >= 0){
					that.clearRow(desc);
					desc = desc - 20;
				}
			}
			
				
			},time);

		this.interval.push(id);
	};

	this.animateWordUp = function(word,time){
		var word_length = word.length,
			counter = 0,
			that = this,
			id = undefined;
		id = setInterval(function(){
			if(counter < word_length){

				if(counter != word_length-1){
					that.animateRowUp(word[counter],false, time, counter);
				}
				else{
					that.animateRowUp(word[counter],true, time,counter);
				}
				counter++;
			}
			else{
				clearInterval(id);
			}
		},time);

	};

	this.animatePhraseUp = function(phrase, time){
		var phrase_length = phrase.length,
			counter = 0,
			that = this,
			id = undefined;

		id = setInterval(function(){
			if(counter < phrase_length){
				that.animateWordUp(phrase[counter], time);
				counter++;
			}
			else{

				clearInterval(id);
			}
			
		}, phrase[counter][0][0] != -1 ? time * phrase[counter].length : 10);

	}


}

var game = new Game(300,400,20);
game.init();
game.animatePhraseUp(test,150);
game.clearRow();





