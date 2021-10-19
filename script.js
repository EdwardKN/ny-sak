var seed = 1;

var player = {
    x:0,
    y:0
}

var map = [];

const app = new PIXI.Application({
    width: 512*8, height: 512*8, backgroundColor: 0x1099bb, });
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

const graphics = new PIXI.Graphics();

app.stage.addChild(graphics);

function generateChunk(X,Y){
    let chunk = [];
    let strip = [];
    for(let x = 0; x < 16; x++){
        strip = []
        for(let y = 0; y < 16; y++){
            strip[y] = random(random(x+seed+X*10,10000)*random(seed-y-Y*10,10000),300)
        }
        chunk.push(strip);
    }
    return chunk;
}
function generateMap(smoothStuff){
    let bigChunk = []
    let strip = [];
    for(let x = 0; x < 2;x++){
        strip = [];

        for(let y = 0; y < 2;y++){
            if(smoothStuff === true){
                strip[y] = smooth(generateChunk(x,y),15,x,y)
            }else{
                strip[y] = generateChunk(x,y)
            }
        }   
        console.log(strip)

        bigChunk.push(strip);
    }

    return bigChunk;
}
function draw(){
    let map = generateMap(true);


console.log(map)

    for(let X = 0; X < 2;X++){
        for(let Y = 0; Y < 2;Y++){
            for(let x = 0; x < map[X][Y].length; x++){
                for(let y = 0; y < map[X][Y][x].length; y++){

                    if(map[X][Y][x][y] < 0){
                        graphics.beginFill(RGB2HTML(200,200,200));
                    }else{
                        graphics.beginFill(RGB2HTML(map[X][Y][x][y],map[X][Y][x][y],map[X][Y][x][y]));
                    }
                    graphics.drawRect((x)*32+X*16*16, (y)*32+Y*16*16, 32, 32);
                    graphics.endFill();
                    

                }
            }
        }
    }
}

draw();

function smooth(chunk,times,X,Y){
    for(let i = 0; i < times; i++){
        for(let x = 0; x < chunk.length; x++){
            for(let y = 0; y < chunk[x].length; y++){
                if(x === 0 && y === 0){
                    let one = chunk[x][y];
                    let two = chunk[x+1][y+1];
                    let three = chunk[x+1][y];
                    let eight = chunk[x][y+1];

                    chunk[x][y] = Math.round((one+two+three+eight)/4)
                }else if(x === 15 && y === 15){
                    let one = chunk[x][y];
                    let six = chunk[x-1][y];
                    let seven = chunk[x-1][y-1];
                    let nine = chunk[x][y-1];

                    chunk[x][y] = Math.round((one+six+seven+nine)/4)
                }else if(x === 0 && y === 15){
                    let one = chunk[x][y];
                    let six = chunk[x+1][y];
                    let seven = chunk[x+1][y-1];
                    let nine = chunk[x][y-1];

                    chunk[x][y] = Math.round((one+six+seven+nine)/4)
                }else if(x === 15 && y === 0){
                    let one = chunk[x][y];
                    let six = chunk[x-1][y];
                    let seven = chunk[x-1][y+1];
                    let nine = chunk[x][y+1];

                    chunk[x][y] = Math.round((one+six+seven+nine)/4)
                }else if(x === 0){
                    let one = chunk[x][y];
                    let two = chunk[x+1][y+1];
                    let three = chunk[x+1][y];
                    let four = chunk[x+1][y-1];
                    let eight = chunk[x][y+1];
                    let nine = chunk[x][y-1];

                    chunk[x][y] = Math.round((one+two+three+four+eight+nine)/6)
                }else if(y === 0){
                    let one = chunk[x][y];
                    let two = chunk[x+1][y+1];
                    let three = chunk[x+1][y];
                    let five = chunk[x-1][y+1];
                    let six = chunk[x-1][y];
                    let eight = chunk[x][y+1];

                    chunk[x][y] = Math.round((one+two+three+five+six+eight)/6)
                }else if(x === 15){
                    let one = chunk[x][y];
                    let five = chunk[x-1][y+1];
                    let six = chunk[x-1][y];
                    let seven = chunk[x-1][y-1];
                    let eight = chunk[x][y+1];
                    let nine = chunk[x][y-1];

                    chunk[x][y] = Math.round((one+five+six+seven+eight+nine)/6)
                }else if(y === 15){
                    let one = chunk[x][y];
                    let three = chunk[x+1][y];
                    let four = chunk[x+1][y-1];
                    let six = chunk[x-1][y];
                    let seven = chunk[x-1][y-1];
                    let nine = chunk[x][y-1];

                    chunk[x][y] = Math.round((one+three+four+six+seven+nine)/6) 
                }else{
                    let one = chunk[x][y];
                    let two = chunk[x+1][y+1];
                    let three = chunk[x+1][y];
                    let four = chunk[x+1][y-1];
                    let five = chunk[x-1][y+1];
                    let six = chunk[x-1][y];
                    let seven = chunk[x-1][y-1];
                    let eight = chunk[x][y+1];
                    let nine = chunk[x][y-1];

                    chunk[x][y] = Math.round((one+two+three+four+five+six+seven+eight+nine)/9)
                }
            }
        }
    }
    return chunk;
}

function random(seed,max){
    return((Math.sin(seed)*1000000)&max)
}
function RGB2HTML(red, green, blue)
{
    var decColor =0x1000000+ blue + 0x100 * green + 0x10000 *red ;
    return '0x'+decColor.toString(16).substr(1);
}