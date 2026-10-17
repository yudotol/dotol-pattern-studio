const $=s=>document.querySelector(s);const canvas=$('#canvas'),ctx=canvas.getContext('2d');
const paths={stripeH:'M0 15H100V30H0ZM0 45H100V60H0ZM0 75H100V90H0Z',stripeV:'M15 0H30V100H15ZM45 0H60V100H45ZM75 0H90V100H75Z',circle:'M 50 0 A 50 50 0 1 0 50 100 A 50 50 0 1 0 50 0',triangle:'M50 4 98 94 2 94Z',square:'M5 5H95V95H5Z',star:'M50 0 61 34 98 35 69 57 79 94 50 73 21 94 31 57 2 35 39 34Z',diamond:'M50 0 85 50 50 100 15 50Z',heart:'M50 92C-30 40 3-12 50 23C97-12 130 40 50 92Z',cross:'M35 0H65V35H100V65H65V100H35V65H0V35H35Z',flower:'M98.000 50.000 L97.478 52.073 L95.949 54.020 L93.524 55.730 L90.377 57.120 L86.732 58.143 L82.841 58.800 L78.971 59.134 L75.372 59.235 L72.266 59.223 L69.826 59.245 L68.163 59.455 L67.321 60.000 L67.270 61.002 L67.919 62.547 L69.120 64.671 L70.683 67.355 L72.396 70.522 L74.042 74.042 L75.418 77.739 L76.354 81.408 L76.724 84.828 L76.456 87.783 L75.534 90.080 L74.000 91.569 L71.944 92.153 L69.493 91.803 L66.800 90.558 L64.023 88.527 L61.314 85.882 L58.800 82.841 L56.575 79.656 L54.689 76.590 L53.146 73.894 L51.907 71.792 L50.893 70.458 L50.000 70.000 L49.107 70.458 L48.093 71.792 L46.854 73.894 L45.311 76.590 L43.425 79.656 L41.200 82.841 L38.686 85.882 L35.977 88.527 L33.200 90.558 L30.507 91.803 L28.056 92.153 L26.000 91.569 L24.466 90.080 L23.544 87.783 L23.276 84.828 L23.646 81.408 L24.582 77.739 L25.958 74.042 L27.604 70.522 L29.317 67.355 L30.880 64.671 L32.081 62.547 L32.730 61.002 L32.679 60.000 L31.837 59.455 L30.174 59.245 L27.734 59.223 L24.628 59.235 L21.029 59.134 L17.159 58.800 L13.268 58.143 L9.623 57.120 L6.476 55.730 L4.051 54.020 L2.522 52.073 L2.000 50.000 L2.522 47.927 L4.051 45.980 L6.476 44.270 L9.623 42.880 L13.268 41.857 L17.159 41.200 L21.029 40.866 L24.628 40.765 L27.734 40.777 L30.174 40.755 L31.837 40.545 L32.679 40.000 L32.730 38.998 L32.081 37.453 L30.880 35.329 L29.317 32.645 L27.604 29.478 L25.958 25.958 L24.582 22.261 L23.646 18.592 L23.276 15.172 L23.544 12.217 L24.466 9.920 L26.000 8.431 L28.056 7.847 L30.507 8.197 L33.200 9.442 L35.977 11.473 L38.686 14.118 L41.200 17.159 L43.425 20.344 L45.311 23.410 L46.854 26.106 L48.093 28.208 L49.107 29.542 L50.000 30.000 L50.893 29.542 L51.907 28.208 L53.146 26.106 L54.689 23.410 L56.575 20.344 L58.800 17.159 L61.314 14.118 L64.023 11.473 L66.800 9.442 L69.493 8.197 L71.944 7.847 L74.000 8.431 L75.534 9.920 L76.456 12.217 L76.724 15.172 L76.354 18.592 L75.418 22.261 L74.042 25.958 L72.396 29.478 L70.683 32.645 L69.120 35.329 L67.919 37.453 L67.270 38.998 L67.321 40.000 L68.163 40.545 L69.826 40.755 L72.266 40.777 L75.372 40.765 L78.971 40.866 L82.841 41.200 L86.732 41.857 L90.377 42.880 L93.524 44.270 L95.949 45.980 L97.478 47.927 L98.000 50.000 Z'};
const names={stripeH:'가로 줄무늬',stripeV:'세로 줄무늬',circle:'땡땡이',triangle:'세모',square:'네모',star:'별',diamond:'마름모',heart:'하트',cross:'십자',flower:'꽃'};let mode='shape',shape='circle',layout='brick',images=[],seed=42;
for(const [key,path]of Object.entries(paths).sort(([a],[b])=>Number(a.startsWith('stripe'))-Number(b.startsWith('stripe')))){const b=document.createElement('button');b.innerHTML=`<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${path}"/></svg>${names[key]}`;b.title=names[key];b.className=key===shape?'active':'';b.onclick=()=>{shape=key;$('#shapes .active')?.classList.remove('active');b.classList.add('active');render()};$('#shapes').append(b)}
function rand(i){let x=Math.sin(i*127.1+seed*311.7)*43758.5453;return x-Math.floor(x)}
function patternPositions(count,w,h,offset,offsetY=0){
  const rows=Math.max(1,Math.min(count,Math.round(Math.sqrt(count*h/w))));
  const points=[];
  for(let row=0;row<rows;row++){
    const n=Math.floor((row+1)*count/rows)-Math.floor(row*count/rows);
    const gap=w/n;
    for(let col=0;col<n;col++)points.push({parity:(row+col)%2,x:((col+.5+(row%2)*offset)*gap)%w,y:((row+.5+(col%2)*offsetY)*h/rows)%h});
  }
  return points;
}
function makeFill(target,width,height){
  const kind=$('#gradientTarget').value===target?$('#gradientKind').value:'solid',start=$('#gradientStart').value,end=$('#gradientEnd').value;
  if(kind==='solid')return $('#'+target).value;
  let gradient;
  if(kind==='radial')gradient=ctx.createRadialGradient(width/2,height/2,0,width/2,height/2,Math.hypot(width,height)/2);
  else{const angle=+$('#gradientAngle').value*Math.PI/180,dx=Math.cos(angle),dy=Math.sin(angle),extent=(Math.abs(dx)*width+Math.abs(dy)*height)/2;
    gradient=ctx.createLinearGradient(width/2-dx*extent,height/2-dy*extent,width/2+dx*extent,height/2+dy*extent)}
  gradient.addColorStop(0,start);gradient.addColorStop(1,end);return gradient;
}
function syncGradientControls(){if(mode==='image'&&$('#gradientTarget').value==='fg')$('#gradientTarget').value='bg';$('#gradientOptions').hidden=$('#gradientKind').value==='solid';$('#gradientAngleControl').hidden=$('#gradientKind').value!=='linear';$('#gradientAngleNumber').value=$('#gradientAngle').value;document.querySelectorAll('[data-gradient-target]').forEach(b=>{b.disabled=mode==='image'&&b.dataset.gradientTarget==='fg';b.setAttribute('aria-pressed',String(b.dataset.gradientTarget===$('#gradientTarget').value))});document.querySelectorAll('[data-gradient-angle]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gradientAngle===$('#gradientAngle').value)))}
function alternateDegrees(base,parity,enabled,extra,style='alternating',index=0){if(!enabled)return base;if(style==='organic')return base+(rand(index+719)*2-1)*Math.abs(extra);return base+(parity?extra:0)}
function drawStripes(direction,w,h,count,ratio){ctx.fillStyle=makeFill('fg',w,h);const step=(direction==='stripeH'?h:w)/count,thickness=step*ratio;for(let i=0;i<count;i++){const at=i*step+(step-thickness)/2;if(direction==='stripeH')ctx.fillRect(0,at,w,thickness);else ctx.fillRect(at,0,thickness,h)}}
function drawEdgeOverlay(w,h){const top=$('#overlayTop').checked,bottom=$('#overlayBottom').checked;$('#overlayOptions').hidden=!top&&!bottom;if(!top&&!bottom)return;const span=h*(+$('#overlayHeight').value/100),color=$('#overlayColor').value;ctx.save();ctx.globalAlpha=+$('#overlayOpacity').value/100;for(const edge of [top?'top':null,bottom?'bottom':null]){if(!edge)continue;const start=edge==='top'?0:h,end=edge==='top'?span:h-span;const gradient=ctx.createLinearGradient(0,start,0,end);gradient.addColorStop(0,color);gradient.addColorStop(1,color+'00');ctx.fillStyle=gradient;ctx.fillRect(0,Math.min(start,end),w,span)}ctx.restore()}
function render(){const stripe=mode==='shape'&&shape.startsWith('stripe');$('#stripeOptions').hidden=!stripe;$('#patternControls').hidden=stripe;$('#alternateOptions').hidden=!$('#alternateRotation').checked;syncGradientControls();const size=+$('#size').value,count=+$('#count').value,rotation=+$('#rotation').value;for(const id of ['size','count','rotation','offset','offsetY','alternateAngle','stripeCount','stripeWidth','patternOpacity','overlayHeight','overlayOpacity'])$('#'+id+'Number').value=$('#'+id).value;for(const id of ['fg','bg'])$('#'+id+'Hex').textContent=$('#'+id).value.toUpperCase();const [w,h]=formats[$('#format').value];document.querySelectorAll('[data-format]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.format===$('#format').value)));canvas.width=w;canvas.height=h;canvas.style.aspectRatio=w+'/'+h;$('.size-badge').textContent=w+' × '+h+' px';$('#offsetControl').hidden=layout!=='brick';ctx.fillStyle=makeFill('bg',w,h);ctx.fillRect(0,0,w,h);ctx.globalAlpha=+$('#patternOpacity').value/100;const foregroundFill=makeFill('fg',w,h);if(stripe){drawStripes(shape,w,h,+$('#stripeCount').value,+$('#stripeWidth').value/100)}else{const positions=patternPositions(count,w,h,layout==='brick'?+$('#offset').value/100:0,layout==='brick'?+$('#offsetY').value/100:0);for(let i=0;i<count;i++){let {x,y}=positions[i];if(layout==='scatter'){x=35+rand(i*3)*(w-70);y=35+rand(i*3+1)*(h-70)}const margin=size;const xs=[x],ys=[y];if(layout!=='scatter'){if(x<margin)xs.push(x+w);if(x>w-margin)xs.push(x-w);if(y<margin)ys.push(y+h);if(y>h-margin)ys.push(y-h)}for(const px of xs)for(const py of ys){ctx.save();ctx.translate(px,py);ctx.rotate((alternateDegrees(rotation,layout==='scatter'?i%2:positions[i].parity,$('#alternateRotation').checked,+$('#alternateAngle').value,$('#rotationStyle').value,i)+(layout==='scatter'?(rand(i*3+2)-.5)*50:0))*Math.PI/180);if(mode==='shape'){ctx.scale(size/100,size/100);ctx.translate(-50,-50);ctx.fillStyle=foregroundFill;ctx.fill(new Path2D(paths[shape]))}else if(images.length){const im=images[i%images.length].img;const ratio=im.naturalWidth/im.naturalHeight;ctx.drawImage(im,-size*Math.min(ratio,1)/2,-size/Math.max(ratio,1)/2,size*Math.min(ratio,1),size/Math.max(ratio,1))}ctx.restore()}}}ctx.globalAlpha=1;drawEdgeOverlay(w,h);$('#empty').hidden=mode!=='image'||images.length>0;$('#summary').textContent=`${mode==='shape'?names[shape]:images.length+'개 이미지'} · ${stripe?$('#stripeCount').value:count}${stripe?'줄':'개'}${stripe?'':(' · '+rotation+'°')}`;$('#fgLabel').style.opacity=mode==='image'?'.4':'1';$('#fg').disabled=mode==='image'}
const formats={square:[1200,1200],carousel:[1080,1350],ppt:[1920,1080]};
for(const id of ['size','count','rotation','offset','offsetY','alternateAngle','stripeCount','stripeWidth'])$('#'+id+'Number').addEventListener('change',e=>{const range=$('#'+id);const n=Number(e.target.value);range.value=Math.min(+range.max,Math.max(+range.min,Number.isFinite(n)?Math.round(n):+range.min));render()});
for(const id of ['gradientKind','gradientStart','gradientEnd','gradientAngle'])$('#'+id).addEventListener('input',render);
$('#gradientAngleNumber').onchange=e=>{const value=Number(e.target.value);$('#gradientAngle').value=Math.max(0,Math.min(360,Number.isFinite(value)?Math.round(value):45));render()};
document.querySelectorAll('[data-gradient-target]').forEach(b=>b.onclick=()=>{$('#gradientTarget').value=b.dataset.gradientTarget;render()});document.querySelectorAll('[data-gradient-angle]').forEach(b=>b.onclick=()=>{$('#gradientAngle').value=b.dataset.gradientAngle;render()});
$('#gradientReverse').onclick=()=>{const first=$('#gradientStart').value;$('#gradientStart').value=$('#gradientEnd').value;$('#gradientEnd').value=first;render()};
$('#alternateRotation').addEventListener('change',render);$('#rotationStyle').addEventListener('change',render);

for(const id of ['overlayTop','overlayBottom','overlayColor'])$('#'+id).addEventListener('input',render);
$('#format').addEventListener('change',render);
document.querySelectorAll('[data-format]').forEach(b=>b.addEventListener('click',()=>{$('#format').value=b.dataset.format;render()}));
for(const id of ['size','count','rotation','offset','offsetY','alternateAngle','stripeCount','stripeWidth','fg','bg'])$('#'+id).addEventListener('input',render);
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;document.querySelectorAll('[data-mode]').forEach(x=>x.classList.toggle('active',x===b));$('#shapePanel').hidden=mode!=='shape';$('#imagePanel').hidden=mode!=='image';render()});
document.querySelectorAll('[data-layout]').forEach(b=>b.onclick=()=>{layout=b.dataset.layout;if(layout==='scatter')seed++;document.querySelectorAll('[data-layout]').forEach(x=>x.classList.toggle('active',x===b));render()});

function hexHsl(hex){const v=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255),max=Math.max(...v),min=Math.min(...v),delta=max-min,l=(max+min)/2;let h=0;if(delta){if(max===v[0])h=((v[1]-v[2])/delta)%6;else if(max===v[1])h=(v[2]-v[0])/delta+2;else h=(v[0]-v[1])/delta+4;h=(h*60+360)%360}return [h,delta?delta/(1-Math.abs(2*l-1)):0,l]}
function hslHex(h,s,l){h=(h%360+360)%360;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;const rgb=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return '#'+rgb.map(v=>Math.round((v+m)*255).toString(16).padStart(2,'0')).join('')}
function harmonyPairs(base,rule){const [h,s,l]=hexHsl(base),shift=rule==='complementary'?180:30;return [{name:'기본',colors:[base,hslHex(h+shift,s,l)]},{name:'밝은 배경',colors:[base,hslHex(h+shift,s*.55,.92)]},{name:'어두운 배경',colors:[hslHex(h,s,.78),hslHex(h+shift,s*.65,.18)]},...(rule==='analogous'?[{name:'반대 방향',colors:[base,hslHex(h-30,s*.55,.9)]}]:[])]}
let harmonyRule='complementary';
function applyPair(colors){[$('#fg').value,$('#bg').value]=colors;$('#gradientStart').value=colors[0];$('#gradientEnd').value=colors[1];render()}
function colorPairButton(name,colors){const b=document.createElement('button');b.type='button';b.title=name+' · '+colors.join(' / ');b.setAttribute('aria-label',b.title);const swatches=document.createElement('span');swatches.className='pair-swatches';for(const color of colors){const swatch=document.createElement('i');swatch.style.background=color;swatches.append(swatch)}const label=document.createElement('span');label.textContent=name;b.append(swatches,label);b.onclick=()=>applyPair(colors);return b}
function updateHarmony(){const container=$('#harmonyPairs');container.replaceChildren();for(const pair of harmonyPairs($('#harmonyBase').value,harmonyRule))container.append(colorPairButton(pair.name,pair.colors));$('#harmonyHelp').textContent=harmonyRule==='complementary'?'색상환의 반대편 색을 짝지어요.':'색상환에서 이웃한 색을 짝지어요.'}
document.querySelectorAll('[data-harmony]').forEach(b=>b.onclick=()=>{harmonyRule=b.dataset.harmony;document.querySelectorAll('[data-harmony]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));updateHarmony()});$('#harmonyBase').oninput=updateHarmony;
const curatedPalettes=[
  [
    "포레스트",
    "내추럴",
    "#becdc8",
    "#fefefd"
  ],
  [
    "세이지",
    "내추럴",
    "#ced8d0",
    "#fdfdfc"
  ],
  [
    "올리브",
    "내추럴",
    "#cacdc1",
    "#fdfdfa"
  ],
  [
    "바다",
    "내추럴",
    "#b9d0d7",
    "#fcfefd"
  ],
  [
    "테라코타",
    "내추럴",
    "#e3c8c0",
    "#fefdfb"
  ],
  [
    "보태니컬",
    "내추럴",
    "#bac8c3",
    "#fefbfb"
  ],
  [
    "라벤더",
    "파스텔",
    "#d7d4e6",
    "#fdfdfe"
  ],
  [
    "피치",
    "파스텔",
    "#f3d9d0",
    "#fffefd"
  ],
  [
    "소다",
    "파스텔",
    "#d4e3e7",
    "#fdfeff"
  ],
  [
    "딸기 우유",
    "파스텔",
    "#edd4dd",
    "#fffdfd"
  ],
  [
    "버터",
    "파스텔",
    "#e5dbbe",
    "#fffefa"
  ],
  [
    "민트",
    "파스텔",
    "#cededb",
    "#fcfefd"
  ],
  [
    "코발트",
    "컬러풀",
    "#b9c6ee",
    "#fefbee"
  ],
  [
    "체리",
    "컬러풀",
    "#e7bbc3",
    "#fefcfc"
  ],
  [
    "오렌지 블루",
    "컬러풀",
    "#f8d3bd",
    "#e9ecf2"
  ],
  [
    "레트로",
    "컬러풀",
    "#bacbce",
    "#fdf8f1"
  ],
  [
    "플럼",
    "컬러풀",
    "#cebbce",
    "#fdfaf1"
  ],
  [
    "라임",
    "컬러풀",
    "#effacd",
    "#e9ebea"
  ],
  [
    "모노",
    "차분한",
    "#bdbdbd",
    "#ffffff"
  ],
  [
    "네이비",
    "차분한",
    "#bec4ce",
    "#fdfdfe"
  ],
  [
    "로즈 그레이",
    "차분한",
    "#dbcdcf",
    "#fefdfd"
  ],
  [
    "슬레이트",
    "차분한",
    "#caced1",
    "#fdfdfd"
  ],
  [
    "잉크",
    "차분한",
    "#f9f8f6",
    "#ebebec"
  ],
  [
    "샌드",
    "차분한",
    "#d6d2cb",
    "#fdfdfc"
  ]
];
let paletteCategory='전체';function showPalettes(){const container=$('.curated-palettes');container.replaceChildren();for(const [name,category,a,b]of curatedPalettes){if(paletteCategory!=='전체'&&category!==paletteCategory)continue;const button=colorPairButton(name,[a,b]);button.dataset.colors=[a,b].join(',');container.append(button)}}
for(const category of ['전체','내추럴','파스텔','컬러풀','차분한']){const b=document.createElement('button');b.type='button';b.textContent=category;b.setAttribute('aria-pressed',String(category===paletteCategory));b.onclick=()=>{paletteCategory=category;[...$('.palette-filters').children].forEach(x=>x.setAttribute('aria-pressed',String(x===b)));showPalettes()};$('.palette-filters').append(b)}
$('#swapColors').onclick=()=>{const fg=$('#fg').value;$('#fg').value=$('#bg').value;$('#bg').value=fg;render()};updateHarmony();showPalettes();

const backgroundPresets={dots:{shape:'circle',size:30,count:84,fg:'#d9e3e7',bg:'#fafcfd',rotate:false},flowers:{shape:'flower',size:38,count:72,fg:'#e8dfe9',bg:'#fdfbfd',rotate:true},stripes:{shape:'stripeV',size:36,count:84,fg:'#eae6de',bg:'#fdfcf9',rotate:false}};
document.querySelectorAll('[data-background-preset]').forEach(b=>b.onclick=()=>{const p=backgroundPresets[b.dataset.backgroundPreset];document.querySelector('[data-mode="shape"]').click();shape=p.shape;const keys=Object.keys(paths).sort((a,b)=>Number(a.startsWith('stripe'))-Number(b.startsWith('stripe')));[...$('#shapes').children].forEach((button,i)=>button.classList.toggle('active',keys[i]===shape));$('#size').value=p.size;$('#count').value=p.count;$('#rotation').value=0;$('#alternateRotation').checked=p.rotate;$('#rotationStyle').value='organic';$('#alternateAngle').value=18;$('#stripeCount').value=16;$('#stripeWidth').value=25;$('#gradientKind').value='solid';$('#format').value='carousel';document.querySelector('[data-layout="brick"]').click();applyPair([p.fg,p.bg])});
function selectEditorTab(name){const sidebar=$('#editorSidebar');sidebar.dataset.editor=name;document.querySelectorAll('[data-editor-tab]').forEach(b=>{const selected=b.dataset.editorTab===name;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1});$('.sidebar-scroll').scrollTop=0}
document.querySelectorAll('[data-editor-tab]').forEach((b,i)=>{b.onclick=()=>selectEditorTab(b.dataset.editorTab);b.onkeydown=e=>{const buttons=[...document.querySelectorAll('[data-editor-tab]')];let index=i;if(e.key==='ArrowRight')index=(i+1)%buttons.length;else if(e.key==='ArrowLeft')index=(i+buttons.length-1)%buttons.length;else if(e.key==='Home')index=0;else if(e.key==='End')index=buttons.length-1;else return;e.preventDefault();selectEditorTab(buttons[index].dataset.editorTab);buttons[index].focus()}});
function thumbs(){$('#thumbs').replaceChildren();images.forEach((item,i)=>{const d=document.createElement('div'),im=document.createElement('img'),b=document.createElement('button');im.src=item.img.src;im.alt=item.name;b.textContent='×';b.setAttribute('aria-label',item.name+' 삭제');b.onclick=()=>{URL.revokeObjectURL(images[i].img.src);images.splice(i,1);thumbs();render()};d.append(im,b);$('#thumbs').append(d)})}
async function addFiles(files){let rejected=0;for(const f of files){if(images.length>=5){rejected++;continue}if(!/^image\/(png|jpeg|webp|svg\+xml)$/.test(f.type)||f.size>15*1024*1024){rejected++;continue}try{const url=URL.createObjectURL(f);const img=await new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=reject;im.src=url});images.push({img,name:f.name})}catch{rejected++}}thumbs();render();$('#status').textContent=rejected?'최대 5개, 파일당 15MB 이하의 지원 이미지를 추가할 수 있어요.':'';$('#files').value=''}
$('#files').onchange=e=>addFiles([...e.target.files]);const drop=$('.upload');drop.ondragover=e=>{e.preventDefault();drop.style.background='#f5f5f5'};drop.ondragleave=()=>drop.style.background='';drop.ondrop=e=>{e.preventDefault();drop.style.background='';addFiles([...e.dataTransfer.files])};
$('#random').onclick=()=>{seed++;if(mode==='shape'){const keys=Object.keys(paths).sort((a,b)=>Number(a.startsWith('stripe'))-Number(b.startsWith('stripe')));shape=keys[Math.floor(Math.random()*keys.length)];[...$('#shapes').children].forEach((b,i)=>b.classList.toggle('active',keys[i]===shape))}const palette=curatedPalettes[Math.floor(Math.random()*curatedPalettes.length)];applyPair(palette.slice(2));$('#rotation').value=Math.floor(Math.random()*12)*15;$('#size').value=25+Math.floor(Math.random()*60);render()};
$('#reset').onclick=()=>{mode='shape';shape='circle';layout='brick';seed=42;images.forEach(x=>URL.revokeObjectURL(x.img.src));images=[];$('#patternOpacity').value=100;$('#overlayTop').checked=false;$('#overlayBottom').checked=false;$('#overlayColor').value='#ffffff';$('#overlayHeight').value=35;$('#overlayOpacity').value=100;$('#size').value=36;$('#count').value=84;$('#rotation').value=0;$('#alternateRotation').checked=false;$('#alternateAngle').value=18;$('#rotationStyle').value='organic';$('#stripeCount').value=12;$('#stripeWidth').value=50;$('#offset').value=50;$('#offsetY').value=0;$('#gradientKind').value='solid';$('#gradientTarget').value='fg';$('#gradientStart').value='#becdc8';$('#gradientEnd').value='#e7dcfa';$('#gradientAngle').value=45;$('#harmonyBase').value='#356253';updateHarmony();$('#format').value='carousel';$('#fg').value='#becdc8';$('#bg').value='#fefefd';document.querySelector('[data-mode="shape"]').click();document.querySelector('[data-layout="brick"]').click();$('#shapes button').click();thumbs();$('#status').textContent='기본 설정으로 돌아왔어요.';render()};
$('#download').onclick=()=>{if(mode==='image'&&!images.length){$('#status').textContent='먼저 패턴에 사용할 이미지를 추가해주세요.';return}canvas.toBlob(blob=>{if(!blob){$('#status').textContent='저장하지 못했어요. 다시 시도해주세요.';return}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='dotol-pattern-'+$('#format').value+'-'+canvas.width+'x'+canvas.height+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#status').textContent=canvas.width+' × '+canvas.height+' px PNG를 저장했어요.'},'image/png')};render();
