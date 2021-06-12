/* Ver1.7 prottercar*/
let wait = 0;
let  Tugi_R=0;
let Tugi_L=0;
let T1=0;
let  PremotionR=0 ;
let  PremotionL=0 ;
let con_kaiten=1.616;
enum pen_onoff {
  up,
  down,
}
enum plotter_houkou {
    前,
    後,
    }
enum onoff {
  無効,
  有効,
}
enum houkou {
    右,
    左,
    ななめ右,
    ななめ左,
}
enum microbit_version {
    Version1,
    Version2,
    Test_A,
    Test_B,
    }
let cond_Distance=1;
let cond_degree=1;
let microbit_wait=700;

let Stepping = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  ];

let Stepping_non = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  ];
let Stepping1 = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0], 
  ];
let SteppingF_0 = [
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0], 
  ];
  let SteppingF_1 = [
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1], 
  ];
  let SteppingF_2 = [
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0], 
  ];
let SteppingF_3 = [
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1],
  [1,0,0,0],
  [0,1,0,0], 
  ];  

let SteppingB_0 = [
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0], 
  ];
  let SteppingB_1 = [

  [0,0,1,0],
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0], 
  [1,0,0,0],  
  ];

  let SteppingB_2 = [
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
    ];
let SteppingB_3 = [

  [1,0,0,0], 
  [0,0,0,1],
  [0,0,1,0],
  [0,1,0,0],
  [1,0,0,0],
  [0,0,0,1],
  [0,0,1,0],
  ];  
  
  let Stepping_R = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  ];

let Stepping_L = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  ];
let moter_number=0;
let io_neo = neopixel.create(DigitalPin.P9, 4, NeoPixelMode.RGB);

//% color="#3943c6" block="ﾌﾟﾛｯﾀｰ・ｶｰVer1.7" icon="\uf1b9"
namespace eureka_plotter_car {

  //% color="#ff3d03" weight=90 blockId=Microbit_Version_info block="ﾏｲｸﾛﾋﾞｯﾄのバージョンを設定する |%Version_info| にする" group="1 初期設定"
  export function microbit_version_info(Version_info : microbit_version) {
    switch(Version_info){
        case microbit_version.Version1:
        microbit_wait=800;
        break;
        case microbit_version.Version2:
        microbit_wait=5000;
        break;
        case microbit_version.Test_A:
        microbit_wait=10000;
        break;       
        case microbit_version.Test_B:
        microbit_wait=90000;
        break;       
    }
  }
function  moter(kyori:number,R_zengo:number,L_zengo:number){
    led.enable(false);
    let i=0;
    /* 端数の計算計算  */

    let kyori_hasuu=kyori%1;
    serial.writeValue("kyori_hasuu", kyori_hasuu);
    let kyori_seisuu=Math.floor(kyori);
/*    serial.writeValue("kyori_seisuu", kyori_seisuu);*/


  /* 前回の動作との比較と処理  */
   serial.writeValue("1Tugi_L", Tugi_L);
    if (PremotionR == R_zengo){ 
        Tugi_R=Tugi_R+1;
    }
    if (PremotionR > R_zengo  ){ 
        Tugi_R=3-Tugi_R+1;
    }
    if (PremotionR < R_zengo  ){ 
        Tugi_R=3-Tugi_R+1;
    }
    
    if (PremotionL == L_zengo){ 
        Tugi_L=Tugi_L+1;
    }
    if (PremotionL > L_zengo ){ 
        Tugi_L=3-Tugi_L+1;
    }
    if (PremotionL < L_zengo ){ 
        Tugi_L=3-Tugi_L+1;
    }


   /*   次のステップ*/ 
    Tugi_L=(Tugi_L)%4;
    Tugi_R=(Tugi_R)%4;
 
    /*右ステッピングの処理*/
    switch (R_zengo) {
      case 0:
        Stepping_R = Stepping_non;
        break;
        if ( Tugi_R == 0){
        Stepping_R=SteppingF_0
        }
        break;
      case 1:

        if (Tugi_R==0){
        Stepping_R=SteppingB_0
        }
        if (Tugi_R==1){
        Stepping_R=SteppingB_1
        }
        if (Tugi_R==2){
        Stepping_R=SteppingB_2
        }
        if (Tugi_R==3){
        Stepping_R=SteppingB_3
        }
        break;
      case 2:
        if ( Tugi_R == 0){
        Stepping_R=SteppingF_0
        }
        if ( Tugi_R ==1){
        Stepping_R=SteppingF_1
        }
        if ( Tugi_R ==2){
        Stepping_R=SteppingF_2
        }
        if ( Tugi_R ==3){
        Stepping_R=SteppingF_3
        }
        break;

    }
        Stepping_L=SteppingF_0
    /*左ステッピングの処理*/
    switch (L_zengo) {
      case 0:
          Stepping_L = Stepping_non;
        break;
     case 1:
        if (Tugi_L==0){
        Stepping_L=SteppingF_0
        }
        if (Tugi_L==1){
        Stepping_L=SteppingF_1
        }
        if (Tugi_L==2){
        Stepping_L=SteppingF_2
        }
        if (Tugi_L==3){
        Stepping_L=SteppingF_3
        }
        break;
      case 2:
        if (Tugi_L==0){
        Stepping_L=SteppingB_0
        }
        if (Tugi_L==1){
        Stepping_L=SteppingB_1
        }
        if (Tugi_L==2){
        Stepping_L=SteppingB_2
        }
        if (Tugi_L==3){
        Stepping_L=SteppingB_3
        }
        break;
    }

    /*  バックラッシュの処理　右車輪 */ 
    if (PremotionR != R_zengo){ 
 /*   music.playTone(523, music.beat(BeatFraction.Sixteenth))*/
    for (let index = 0; index < 3; index++) {
    let Data1=0;
    while ( Data1 < 4){
      pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
      pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
      pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
      pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
      Data1=Data1+1;
      for (i = 0; i < microbit_wait; i++);
      {
      }
      }
    }
    }

    /*  バックラッシュの処理　左車輪 */ 
    if (PremotionL != L_zengo){ 
 /*   music.playTone(523, music.beat(BeatFraction.Sixteenth))*/
    for (let index = 0; index < 3; index++) {
    let Data1=0;
    while ( Data1 < 4){
      pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
      pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
      pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
      pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
      Data1=Data1+1;
      for (i = 0; i < microbit_wait; i++);
      {
      }
      }
    }
    }

    　　　
    /*  整数部の処理　 */ 
    for (let index = 0; index < kyori_seisuu; index++) {
    let Data1=0;
    while ( Data1 < 4){

      pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
      pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
      pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
      pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
      pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
      pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
      pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
      pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
      Data1=Data1+1;
      for (i = 0; i < microbit_wait; i++);
      {
      }
      }
    }

   /* 端数分の進み方と処理  */
　  let Step_number=Math.floor(kyori_hasuu*10/2.5);
    let Data1=0;
    while ( Data1 < Step_number){
      serial.writeValue("Data1", Data1);
      pins.digitalWritePin(DigitalPin.P3, Stepping_R[Data1][0]);
      pins.digitalWritePin(DigitalPin.P13, Stepping_L[Data1][0]);
      pins.digitalWritePin(DigitalPin.P4, Stepping_R[Data1][1]);
      pins.digitalWritePin(DigitalPin.P14, Stepping_L[Data1][1]);
      pins.digitalWritePin(DigitalPin.P6, Stepping_R[Data1][2]);
      pins.digitalWritePin(DigitalPin.P15, Stepping_L[Data1][2]);
      pins.digitalWritePin(DigitalPin.P7, Stepping_R[Data1][3]);
      pins.digitalWritePin(DigitalPin.P16, Stepping_L[Data1][3]);
      Data1=Data1+1;
      for (i = 0; i < microbit_wait; i++);
      {
      }
      }
    
        Tugi_L=(Tugi_L + Data1-1)%4; 
        Tugi_R = (Tugi_R + Data1-1)%4;

    PremotionR = R_zengo;
    PremotionL = L_zengo;

}

  //% color="#ff3d03" weight=90 blockId=auto_led_off block="ﾏｲｸﾛﾋﾞｯﾄのLEDを |%Matrix_LED| にする" group="1 初期設定"
  export function auto_led_off(Matrix_LED:onoff) {
    switch(Matrix_LED){
        case onoff.無効:
        led.enable(false);
        break;
        case onoff.有効:
        led.enable(true);
    }
  }


  //% color="#009CA0" weight=96 blockId=eureka_relay block="ペン |%mode| " group="2 ペンの状態"
  export function plottercar_pen(mode: pen_onoff) {
    if (mode == pen_onoff.down) {
      pins.servoWritePin(AnalogPin.P8, 0);
      basic.pause(1000);
    }
    if (mode == pen_onoff.up) {
      pins.servoWritePin(AnalogPin.P8, 90);
      basic.pause(100);
    }
  }

  //% color="#3943c6" weight=80　blockId=plottercar_1sou_forward
  //% block="前へ |%F_cm| ｃｍ進む" group="3　基本の動き"
    export function plottercar_1sou_forward(F_cm: number): void {
    moter_number= F_cm / (18.9*cond_Distance) * 512;
    moter(moter_number,1,1);
    }


  //% color="#3943c6" weight=78　blockId=plottercar_1sou_back
  //% block="後ろへ |%F_cm| ｃｍ進む" group="3　基本の動き"
    export function plottercar_1sou_back(F_cm: number): void {
    moter_number= F_cm / (18.9*cond_Distance) * 512;
    moter(moter_number,2,2);
       }


  //% color="#3943c6" weight=76　blockId=plottercar_L_cycle
  //% block="左回り　角度 |%L_degree| " group="3　基本の動き"
  export function plottercar_L_cycle(L_degree: number): void {
    moter_number= L_degree / 360 * 512 * con_kaiten*cond_degree;
    moter(moter_number,1,2);
   }
 
  //% color="#3943c6" weight=74　blockId=plottercar_R_cycle
  //% block="右回り　角度 |%R_degree| " group="3　基本の動き"
  export function plottercar_R_cycle(R_degree: number): void {
    moter_number= R_degree / 360 * 512 * con_kaiten*cond_degree;
    moter(moter_number,2,1);
  }

  //% color="#ff4940" weight=71　blockId=plottercar_rest
  //% block="停止状態（電流ＯＦＦ）" group="3　基本の動き"
  export function plottercar_frest(): void {
    moter_number= 1;
    moter(moter_number,0,1);
  }

  //% color="#3943c6" weight=55　blockId=plottercar_R_step
  //% block="右車輪　|%R_step|ステップ |%houkou|方向" group="3　基本の動き"

  export function plottercar_R_step(R_step: number,houkou:plotter_houkou): void {
    moter_number= R_step;
        switch(houkou){
        case plotter_houkou.前:
            moter(R_step/4,1,0);
        return;   
        case plotter_houkou.後:
            moter(R_step/4,2,0);      
        return;
    }
}
  //% color="#3943c6" weight=58　blockId=plottercar_L_step
  //% block="左車輪 |%L_step|ステップ |%houkou|方向" group="3　基本の動き"

  export function plottercar_L_step(L_step: number,houkou:plotter_houkou): void {
    moter_number= L_step;
        switch(houkou){
        case plotter_houkou.前:
            moter(L_step/4,0,1); 
        return;   
        case plotter_houkou.後:
            moter(L_step/4,0,2);    
        return;
    }
} 

  //% color="#009A00" weight=40　blockId=polygon
  //% block="多角形作図 |%digree_step| 角形　一辺の長さ |%Edge_Num| cm " group="4　図形"
  export function polygon(digree_step: number,Edge_Num:number): void {

    for (let index = 0; index < digree_step; index++) {
        eureka_plotter_car.plottercar_1sou_forward(Edge_Num)
        eureka_plotter_car.plottercar_L_cycle(360/digree_step)
     }
    plottercar_frest()
    }


  //% color="#009A00" weight=39　blockId=cycle
  //% block="円の作図 直径 |%D_Num| cm " group="4　図形"
  export function cycle(D_Num:number): void {
    let cir = D_Num * 3.14
    let Foward_D =  cir/ 30
    for (let index = 0; index < 30; index++) {
        eureka_plotter_car.plottercar_1sou_forward(Foward_D)
        eureka_plotter_car.plottercar_R_cycle(360 / 30)
    }
  }


  //% color="#3943c6" weight=72　blockId=plottercar_houkou
  //% block="ほうこうを変える |%muki| へ " group="3　基本の動き"
    export function plottercar_houkou(muki: houkou): void {
        switch(muki){
            case houkou.右:
                return eureka_plotter_car.plottercar_R_cycle(90)
            case houkou.左:
                return eureka_plotter_car.plottercar_L_cycle(90);
            case houkou.ななめ右:
                return eureka_plotter_car.plottercar_R_cycle(45);
            case houkou.ななめ左:
                return eureka_plotter_car.plottercar_L_cycle(45);
        }
    }

  //% color="#ffa800" weight=20　blockId=plotter_Distance
  //% block="進行距離調整(1→1/1000)  短く |%Dis| 長く" group="5 調整"
  //% Dis.min=-30 Dis.max=30
  export function plotter_Distance(Dis: number): void {
    cond_Distance = (1+Dis/1000);
  }

  //% color="#ffa800" weight=18　blockId=plotter_degree
  //% block="回転角度調整（1→1/1000）  少なく回転 |%Deg| 多く回転" group="5 調整"
  //% Deg.min=-30 Deg.max=30
  export function plotter_degree(Deg: number): void {
    cond_degree = (1+Deg/1000);
  }

//% color="#ff4500" weight=90 block="iːo(ｲｰｵ)専用"

namespace newio_blocks {



    //% color="#4741f1" weight=89 blockId=neopixel_blue block="iːo青信号 点灯|%mode|" group="1 iːoネオピクセル"
    export function neopixel_blue_block(mode: onoff) {
    switch (mode) {
      case  onoff.ON :
        io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Blue))
        io_neo.show()
        break;
                
      case onoff.OFF:
         io_neo.setPixelColor(0, neopixel.colors(NeoPixelColors.Black))
         io_neo.show()
        break;
    }
  }

    //% color="#ffa800" weight=86 blockId=neopixel_yellow block="iːo黄信号 点灯|%mode|" group="1 iːoネオピクセル"
    export function neopixel_yellow_block(mode: onoff) {
    switch (mode) {
      case  onoff.ON :
        io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Yellow))
        io_neo.show()
        break;
                
      case onoff.OFF:
         io_neo.setPixelColor(1, neopixel.colors(NeoPixelColors.Black))
         io_neo.show()
        break;
    }
  }

    //% color="#ff4940" weight=84 blockId=neopixel_red block="iːo赤信号 点灯|%mode|" group="1 iːoネオピクセル"
    export function neopixel_red_block(mode: onoff) {
    switch (mode) {
      case  onoff.ON :
        io_neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Red))
        io_neo.show()
        break;
                
      case onoff.OFF:
         io_neo.setPixelColor(2, neopixel.colors(NeoPixelColors.Black))
         io_neo.show()
        break;
    }
  }
 
    //% color="#20b2aa" weight=82 blockId=neopixel_select block="ﾌﾙｶﾗｰLED |%neo_color| 色で |%neo_number|個つける" group="1 iːoネオピクセル"
    export function neopixel_select_block(neo_color: neoLED_color,neo_number:number) {

    switch (neo_color){
        case neoLED_color.赤 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Red))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.だいだい :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Orange))            
        } 
        io_neo.show()
        break;    
        case neoLED_color.黄 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Yellow))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.緑 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Green))            
        } 
        io_neo.show()
        break;
        case neoLED_color.青 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Blue))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.あい :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Indigo))            
        } 
        io_neo.show()
        break;
        case neoLED_color.すみれ :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Violet))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.紫 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Purple))            
        } 
        io_neo.show()
        break;
        case neoLED_color.白 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.White))            
        } 
        io_neo.show()
        break;                
        case neoLED_color.黒 :
        for (let n=0 ; n < neo_number;n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Black))            
        } 
        io_neo.show()
        break;
    }
  }

    //% color="#cd853f" weight=80 blockId=neopixel_erace block="ﾌﾙｶﾗｰLEDを全部消す" group="1 iːoネオピクセル"
    export function neopixel_erace_block() {
        for (let n=0 ; n < 4 ; n++){
        io_neo.setPixelColor(n, neopixel.colors(NeoPixelColors.Black))            
        } 
        io_neo.show()
    }



  //% color="#1E90FF" weight=83 block="待ち時間（秒）|%second|" group="1 iːoネオピクセル"
  //% second.min=0 second.max=10
  export function driveForwards(second: number): void {
    basic.pause(second * 1000);
  }


  //% color="#a0522d" weight=36 block="iːo人が動いたら" group="2 iːo人感センサー"
  export function IO_humanDetection(): boolean {
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        if (pins.digitalReadPin(DigitalPin.P14) == 1) {
          return true;
        } else {
          return false;
        }
  }
 
  //% color="#a0522d" weight=34 blockId=IO_human block="iːo人感ｾﾝｻ値" group="2 iːo人感センサー"
    export function IO_human(): number {
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        return pins.digitalReadPin(DigitalPin.P14);
  }

  //% color="#a0522d"  weight=79 blockId=IO_human_DISP block="iːo人感ｾﾝｻの値を表示する" group="2 iːo人感センサー"
  export function IO_human_DISP() {

    pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
       basic.showNumber(pins.digitalReadPin(DigitalPin.P14));
  }

  //% color="#009A00"  weight=81 blockId=microbit2_decideLight block="m:bit光ｾﾝｻ値 |%limit| より暗い" group="3 microbitの光ｾﾝｻ"
  //% limit.min=0 limit.max=100
  export function microbit2_decideLight(limit: number) :boolean{
        if (input.lightLevel()/254*100  < limit) {            
          return true;
        } else {
          return false;
        }
   }



  //% color="#009A00"  weight=80 blockId=microbit2_denkitemp block="m:bit光ｾﾝｻ値" group="3 microbitの光ｾﾝｻ"
  export function microbit2_denkitemp():number{

        return Math.round(input.lightLevel()/254*100);

  }


  //% color="#228b22"  weight=82 blockId=microbit2_denkiLED block="m:bit光ｾﾝｻの値を表示する" group="3 microbitの光ｾﾝｻ"
  export function microbit2_denkiLED(){
            basic.showNumber(Math.round(input.lightLevel()/254*100));
  }


  //% color="#696969" weight=58 blockId=IO_relay block="iːoﾘﾚｰ(ﾃﾞｼﾞﾀﾙ) |%mode|" group="4 iːoリレー"
  export function IO_relay(mode: onoff) {
    switch (mode) {
      case onoff.ON:{
          return pins.digitalWritePin(DigitalPin.P8, 1);
        } 
      case onoff.OFF: {
           return pins.digitalWritePin(DigitalPin.P8, 0);
        }
    }
  }
  //% color="#696969" weight=56 blockId=IO_relay_2 block="iːoﾘﾚｰ(ｱﾅﾛｸﾞ) |%syuturyoku|" group="4 iːoリレー"
  //% syuturyoku.min=0 syuturyoku.max=1023
  export function IO_relay_2(syuturyoku: number) {
        return pins.analogWritePin(AnalogPin.P8, syuturyoku);
  }


}


