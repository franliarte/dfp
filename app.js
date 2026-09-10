const F=document.getElementById('form'), S=document.getElementById('saveStatus');
const marketing=[
 {text:'Presencia de valla central estática en el centro de campo con logo de la competición',evidence:'Foto realizada'},
 {text:'Presencia del logo de la competición en parte central de publicidad digital'},
 {text:'Presencia y utilización de publimetas con la imagen de PRIMERA FEDERACIÓN junto a ambas porterías',evidence:'Foto realizada'},
 {text:'Presencia de peana para balón a la salida del campo con logo de la competición',evidence:'Foto realizada'},
 {text:'Presencia de trasera para entrevista Superflash con logo de la competición',evidence:'Foto realizada'},
 {text:'Presencia de trasera para entrevista flash con logo de la competición',evidence:'Foto realizada'},
 {text:'Presencia de trasera para entrevistas en zona mixta con logo de competición',evidence:'Foto realizada'},
 {text:'Presencia de trasera en la sala de prensa con logo de la competición',evidence:'Foto realizada'},
 {text:'Hoja de alineaciones oficial con logo de la competición',evidence:'Foto / papel disponible'},
 {text:'Medios de comunicación y personal de la organización usan petos con el logo de la RFEF',evidence:'Foto realizada'},
 {text:'Medios de comunicación y personal de la organización usan credencial oficial de la RFEF',evidence:'Foto / acreditación disponible'},
];
const tvSections=[
 {title:'1. Aspectos generales posiciones de cámara',items:[
  ['1.1 Master y fueras de juego misma altura',[['Cumple','Cumple'],['No cumple (-1)','No cumple (-1)']]],
  ['1.2 Posiciones nivelada',[['Sí','Sí'],['No (-0,25)','No (-0,25)']]],
  ['1.3 Posiciones sólidas y sin vibraciones',[['Sí','Sí'],['No (-1)','No (-1)']]],
  ['1.4 Superficies lisas y antideslizantes',[['Sí','Sí'],['No (-0,25)','No (-0,25)']]],
  ['1.5 Cubierta/protección frente a lluvia o sol',[['Sí','Sí'],['No (-0,5)','No (-0,5)']]],
  ['1.6 Acceso seguro',[['Sí','Sí'],['No (-0,25)','No (-0,25)']]],
  ['1.7 Visión completamente despejada',[['Sí','Sí'],['No (-1)','No (-1)']]],
  ['1.8 Toma de corriente disponible',[['Sí','Sí'],['No (-0,5)','No (-0,5)']]],
 ]},
 {title:'2. Cámara master',items:[
  ['2.1 Situada sobre la línea de medio campo',[['Sí','Sí'],['No (-1)','No (-1)']]],
  ['2.2 Altura adecuada 12-15 grados',[['Sí','Sí'],['No (-0,25)','No (-0,25)']]],
  ['2.3 Orientación adecuada, evita contraluz',[['Sí','Sí'],['No (-0,5)','No (-0,5)']]],
  ['2.4 Dimensiones mínimas del practicable 4x2 m',[['Sí','Sí'],['No (-0,25)','No (-0,25)']]],
 ]},
 {title:'3. Cámaras de fuera de juego',items:[
  ['3.1 Situadas a la altura de la línea del área de penalti',[['Sí','Sí'],['No (-1)','No (-1)']]],
  ['3.2 Dimensiones mínimas del practicable 2x2 m',[['Sí','Sí'],['No (-0,25)','No (-0,25)']]],
 ]},
 {title:'4. Ocupación del estadio',items:[
  ['4. Ocupación visible grada frente a cámara principal',[[ '< 40% (-2)','< 40% (-2)'],['>= 60% (0)','>= 60% (0)'],['Entre 40% y 59% (-1)','Entre 40% y 59% (-1)']]],
 ]},
];
function radioBlock(name,text,options){return `<div class="sub"><b>${text}</b><div class="radios">${options.map(([label,value])=>`<label><input type="radio" name="${name}" value="${value}"> ${label}</label>`).join('')}</div></div>`}
function marketingRow(item,i){return `<div class="sub"><div class="switchrow"><strong>${item.text}</strong><label class="switch"><input type="checkbox" name="mkt_${i}"><span></span></label></div>${item.evidence?`<div class="photoMount" data-photo-key="mkt_${i}"></div>`:''}</div>`}
document.getElementById('marketingItems').innerHTML=marketing.map(marketingRow).join('');
document.getElementById('tvItems').innerHTML=tvSections.map((sec,si)=>`<div class="tvsection"><h3>${sec.title}</h3>${sec.items.map((it,ii)=>radioBlock(`tv_${si}_${ii}`,it[0],it[1])).join('')}</div>`).join('');
function serialize(){const d={}; new FormData(F).forEach((v,k)=>d[k]=v); F.querySelectorAll('input[type=checkbox]').forEach(x=>d[x.name]=x.checked); return d}
function restore(d){if(!d)return; Object.entries(d).forEach(([k,v])=>{const els=F.elements[k]; if(!els)return;if(els instanceof RadioNodeList){[...els].forEach(e=>{if(e.type==='radio')e.checked=e.value===v;else if(e.type==='checkbox')e.checked=!!v})}else if(els.type==='checkbox')els.checked=!!v;else els.value=v??''}); updateUI()}
function save(msg='Guardado localmente'){localStorage.setItem('dfp_draft_v1',JSON.stringify(serialize()));localStorage.setItem('dfp_saved_at',new Date().toISOString());S.textContent='🟢 '+msg+' · '+new Date().toLocaleTimeString('es-ES')}
let t; F.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(()=>save(),350)});F.addEventListener('change',()=>save());
function updateUI(){document.getElementById('operadorBox').style.display=F.elements.televisado.checked?'block':'none';document.getElementById('hibridoBox').style.display=F.elements.hibrido.checked?'block':'none';document.getElementById('riegoSi').style.display=F.elements.acuerdo_riego.checked?'block':'none';document.getElementById('riegoNo').style.display=F.elements.acuerdo_riego.checked?'none':'block'}
F.addEventListener('change',updateUI);
document.getElementById('saveBtn').onclick=e=>{e.preventDefault();save('Borrador guardado')};
function reportRows(){
 const d=serialize(), rows=[];
 const section=t=>rows.push({type:'section',text:t});
 const add=(h,v)=>{if(v!==''&&v!=null)rows.push({type:'row',label:h,value:v===true?'Sí':v===false?'No':String(v)})};
 rows.push({type:'title',text:'INFORME DFP - PRIMERA FEDERACIÓN 2026/27'});
 section('INFORMACIÓN GENERAL DEL PARTIDO');
 add('Equipo local',d.equipo_local); add('Equipo visitante',d.equipo_visitante); add('Fecha',d.fecha);
 add('Inicio 1ª parte',d.inicio_1); add('Inicio 2ª parte',d.inicio_2); add('Contacto club local',d.contacto_local); add('Contacto club visitante',d.contacto_visitante);
 add('Partido televisado',d.televisado?'Sí':'No'); if(d.televisado)add('Operador audiovisual',d.operador);
 add('Espectadores',d.espectadores); add('Espectadores visitantes',d.espectadores_visitantes); add('Resultado descanso',d.resultado_descanso); add('Resultado final',d.resultado_final); add('Resultado prórroga',d.resultado_prorroga); add('Tanda de penaltis',d.penaltis);
 section('ESTADO DEL TERRENO DE JUEGO');
 add('Meteorología 24h',d.meteo_24); add('Previsión hora del partido',d.meteo_hora); add('Largo del terreno (m)',d.largo); add('Ancho del terreno (m)',d.ancho); add('Clase de césped',d.clase_cesped);
 add('Césped híbrido',d.hibrido?'Sí':'No'); if(d.hibrido)add('Tipo de hibridez',d.tipo_hibridez);
 add('Acuerdo sobre riego',d.acuerdo_riego?'Sí':'No');
 if(d.acuerdo_riego){add('Regado antes del partido',d.riego_antes?'Sí':'No');add('Regado durante el descanso',d.riego_descanso?'Sí':'No');add('Riego equitativo',d.riego_equitativo?'Sí':'No');}
 else {add('Sin riego desde una hora antes',d.no_riego_hora?'Sí':'No');add('Sin riego durante el descanso',d.no_riego_descanso?'Sí':'No');}
 add('Cobertura vegetal',d.cobertura); add('Mala hierba',d.mala_hierba); add('Tipo de clima',d.clima); add('Altura / desviación',d.altura); add('Marcaje',d.marcaje); add('Postes y larguero limpios',d.postes); add('Redes limpias',d.redes_limpias); add('Redes en perfecto estado',d.redes_estado); add('Banderines',d.banderines); add('Limpieza general',d.limpieza); add('Observaciones terreno',d.observaciones_terreno);
 section('MARKETING - IMAGEN CORPORATIVA RFEF');
 marketing.forEach((x,i)=>add(x.text,d['mkt_'+i]?'Sí':'No')); add('Observaciones Marketing',d.observaciones_marketing);
 section('PRODUCCIÓN AUDIOVISUAL');
 tvSections.forEach((sec,si)=>{rows.push({type:'subsection',text:sec.title});sec.items.forEach((it,ii)=>add(it[0],d[`tv_${si}_${ii}`]||'Sin responder'))}); add('Observaciones Producción Audiovisual',d.observaciones_tv);
 section('OTRAS CUESTIONES RELEVANTES');
 add('Incidencias / observaciones',d.otras_cuestiones||'Sin incidencias registradas.');
 rows.push({type:'note',text:'Las fotografías adjuntas se incluyen al final del PDF, agrupadas por su apartado correspondiente.'});
 return rows;
}
function pdfSafe(s){return String(s??'').replaceAll('≥','>=').replaceAll('≤','<=').replaceAll('–','-').replaceAll('—','-').replaceAll('’',"'").replaceAll('“','"').replaceAll('”','"').replace(/[\u0100-\uFFFF]/g,'?')}
function pdfEsc(s){return pdfSafe(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)')}
function wrapText(text,max=88){const paras=String(text??'').split(/\r?\n/),out=[];for(const para of paras){const words=para.split(/\s+/).filter(Boolean);if(!words.length){out.push('');continue}let line='';for(const w of words){if((line+' '+w).trim().length>max&&line){out.push(line);line=w}else line=(line+' '+w).trim()}if(line)out.push(line)}return out}
function latin1Bytes(str){const a=new Uint8Array(str.length);for(let i=0;i<str.length;i++){let c=str.charCodeAt(i);a[i]=c<=255?c:63}return a}
async function buildPdfBlob(){
 const rows=reportRows(), textPages=[]; let page=[], y=800;
 const pushPage=()=>{if(page.length)textPages.push(page);page=[];y=800};
 const text=(x,size,s,bold=false)=>{if(y<55)pushPage();page.push({x,y,size,s:pdfEsc(s),bold});y-=size+5};
 const gap=n=>{y-=n;if(y<55)pushPage()};
 rows.forEach(r=>{
  if(r.type==='title'){text(42,16,r.text,true);gap(8);return}
  if(r.type==='section'){gap(8);text(42,12,r.text,true);gap(3);return}
  if(r.type==='subsection'){gap(4);text(48,10,r.text,true);return}
  if(r.type==='note'){gap(10);wrapText(r.text,92).forEach(l=>text(42,8,l,false));return}
  const prefix=r.label+': '; const firstMax=Math.max(35,88-prefix.length); const vals=wrapText(r.value,firstMax);
  if(!vals.length) vals.push('');
  text(48,9,prefix+vals[0],false); for(let i=1;i<vals.length;i++)text(58,9,vals[i],false);
 });
 pushPage();

 // Recuperar las fotos locales. Cada una se añadirá en una página propia,
 // agrupada e identificada por el apartado al que pertenece.
 if(!photoDB) await openPhotoDB();
 const photoGroups=[
  ['cesped','TERRENO DE JUEGO - Césped'],
  ['marcaje','TERRENO DE JUEGO - Marcaje'],
  ['porterias','TERRENO DE JUEGO - Porterías'],
  ['banderines','TERRENO DE JUEGO - Banderines de córner'],
  ['limpieza','TERRENO DE JUEGO - Limpieza general'],
  ['observaciones_terreno','TERRENO DE JUEGO - Observaciones'],
  ...marketing.filter(x=>x.evidence).map((x,i0)=>{const real=marketing.indexOf(x);return [`mkt_${real}`,`MARKETING - ${x.text}`]})
 ];
 const photoPages=[];
 for(const [key,label] of photoGroups){
   const photos=await getPhotos(key);
   for(let i=0;i<photos.length;i++){
     const blob=photos[i].blob;
     let jpeg=blob;
     // Garantiza JPEG válido para incrustarlo en el PDF.
     if(blob.type!=='image/jpeg'){
       const bmp=await createImageBitmap(blob);const c=document.createElement('canvas');c.width=bmp.width;c.height=bmp.height;c.getContext('2d').drawImage(bmp,0,0);bmp.close();jpeg=await new Promise(r=>c.toBlob(r,'image/jpeg',0.82));
     }
     const bmp=await createImageBitmap(jpeg); const w=bmp.width,h=bmp.height; bmp.close();
     photoPages.push({label:`${label}${photos.length>1?` (${i+1}/${photos.length})`:''}`,bytes:new Uint8Array(await jpeg.arrayBuffer()),w,h});
   }
 }

 const enc=s=>latin1Bytes(s);
 const objs=[]; const addObj=body=>{objs.push(body);return objs.length};
 const font=addObj(enc('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'));
 const fontB=addObj(enc('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'));
 const pageSpecs=[];
 textPages.forEach(pg=>{
   const stream=pg.map(t=>`BT /${t.bold?'F2':'F1'} ${t.size} Tf 1 0 0 1 ${t.x} ${t.y} Tm (${t.s}) Tj ET`).join('\n');
   const cid=addObj(enc(`<< /Length ${enc(stream).length} >>\nstream\n${stream}\nendstream`));
   pageSpecs.push({content:cid,image:null});
 });
 for(const ph of photoPages){
   const imageHead=enc(`<< /Type /XObject /Subtype /Image /Width ${ph.w} /Height ${ph.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${ph.bytes.length} >>\nstream\n`);
   const imageTail=enc('\nendstream');
   const imageBytes=new Uint8Array(imageHead.length+ph.bytes.length+imageTail.length);imageBytes.set(imageHead);imageBytes.set(ph.bytes,imageHead.length);imageBytes.set(imageTail,imageHead.length+ph.bytes.length);
   const iid=addObj(imageBytes);
   const maxW=511,maxH=690,scale=Math.min(maxW/ph.w,maxH/ph.h,1);const dw=Math.round(ph.w*scale),dh=Math.round(ph.h*scale),x=Math.round((595-dw)/2),iy=70+Math.round((690-dh)/2);
   const labelLines=wrapText(ph.label,78).slice(0,3);let cmd=`BT /F2 12 Tf 1 0 0 1 42 800 Tm (FOTOGRAFÍA ADJUNTA) Tj ET\n`;
   labelLines.forEach((ln,i)=>cmd+=`BT /F1 9 Tf 1 0 0 1 42 ${780-i*13} Tm (${pdfEsc(ln)}) Tj ET\n`);
   cmd+=`q ${dw} 0 0 ${dh} ${x} ${iy} cm /Im1 Do Q`;
   const cid=addObj(enc(`<< /Length ${enc(cmd).length} >>\nstream\n${cmd}\nendstream`));
   pageSpecs.push({content:cid,image:iid});
 }
 const pageIds=pageSpecs.map(()=>addObj(enc('PENDING')));
 const pagesId=addObj(enc('PAGES_PENDING'));
 pageSpecs.forEach((spec,i)=>{
   const xobj=spec.image?` /XObject << /Im1 ${spec.image} 0 R >>`:'';
   objs[pageIds[i]-1]=enc(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 ${font} 0 R /F2 ${fontB} 0 R >>${xobj} >> /Contents ${spec.content} 0 R >>`);
 });
 objs[pagesId-1]=enc(`<< /Type /Pages /Kids [${pageIds.map(id=>id+' 0 R').join(' ')}] /Count ${pageIds.length} >>`);
 const catalog=addObj(enc(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`));
 const chunks=[enc('%PDF-1.4\n%âãÏÓ\n')], offsets=[0];let pos=chunks[0].length;
 objs.forEach((body,i)=>{offsets.push(pos);const a=enc(`${i+1} 0 obj\n`),b=enc('\nendobj\n');chunks.push(a,body,b);pos+=a.length+body.length+b.length});
 const xref=pos;let tail=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`;for(let i=1;i<offsets.length;i++)tail+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';tail+=`trailer\n<< /Size ${objs.length+1} /Root ${catalog} 0 R >>\nstartxref\n${xref}\n%%EOF`;
 chunks.push(enc(tail));return new Blob(chunks,{type:'application/pdf'});
}
function cleanFilePart(s){return String(s||'').trim().replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_-]+/g,'-').replace(/-+/g,'-').slice(0,45)||'partido'}
async function shareReport(){
 save('Informe final guardado');
 const blob=await buildPdfBlob();
 const name=`DFP_${F.elements.fecha.value||'partido'}_${cleanFilePart(F.elements.equipo_local.value)}_${cleanFilePart(F.elements.equipo_visitante.value)}.pdf`;
 const file=new File([blob],name,{type:'application/pdf'});
 if(navigator.share&&navigator.canShare?.({files:[file]})){
   await navigator.share({title:'Informe DFP',text:'Informe DFP para enviar a fran.liarte@gmail.com',files:[file]});
 }else{
   const a=document.createElement('a');const url=URL.createObjectURL(blob);a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);alert('PDF generado y descargado. Puedes adjuntarlo a un correo para fran.liarte@gmail.com.');
 }
}
document.getElementById('confirmBtn').onclick=async e=>{e.preventDefault();if(confirm('¿Confirmar el informe y generar una copia para enviarla a fran.liarte@gmail.com? Los datos locales NO se borrarán.')){try{await shareReport()}catch(err){console.error(err)}}};
try{restore(JSON.parse(localStorage.getItem('dfp_draft_v1')||'null'));const at=localStorage.getItem('dfp_saved_at');S.textContent=at?'🟢 Borrador recuperado · '+new Date(at).toLocaleTimeString('es-ES'):'🟢 Preparado · todavía sin datos';}catch(e){S.textContent='🟠 No se pudo recuperar el borrador'}updateUI();
if('serviceWorker'in navigator){navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(console.error);}

// Borrado protegido del borrador completo
const deleteDialog=document.getElementById('deleteDialog');
const deleteWord=document.getElementById('deleteWord');
const confirmDelete=document.getElementById('confirmDelete');
document.getElementById('deleteBtn').onclick=e=>{
  e.preventDefault();
  deleteWord.value='';
  confirmDelete.disabled=true;
  deleteDialog.showModal();
  setTimeout(()=>deleteWord.focus(),50);
};
document.getElementById('cancelDelete').onclick=e=>{e.preventDefault();deleteDialog.close();};
deleteWord.addEventListener('input',()=>{confirmDelete.disabled=deleteWord.value!=='BORRAR';});
confirmDelete.onclick=e=>{
  e.preventDefault();
  if(deleteWord.value!=='BORRAR') return;
  localStorage.removeItem('dfp_draft_v1');
  localStorage.removeItem('dfp_saved_at');
  clearAllPhotos();
  F.reset();
  updateUI();
  deleteDialog.close();
  S.textContent='🟢 Todos los datos han sido borrados';
  window.scrollTo({top:0,behavior:'smooth'});
};


// Fotografías offline: IndexedDB, comprimidas y fuera del PDF
const PHOTO_DB='dfp_photos_v1', PHOTO_STORE='photos';
let photoDB=null;
function openPhotoDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open(PHOTO_DB,1);r.onupgradeneeded=()=>{const db=r.result;if(!db.objectStoreNames.contains(PHOTO_STORE)){const st=db.createObjectStore(PHOTO_STORE,{keyPath:'id',autoIncrement:true});st.createIndex('section','section',{unique:false});}};r.onsuccess=()=>{photoDB=r.result;resolve(photoDB)};r.onerror=()=>reject(r.error);});}
function photoTx(mode='readonly'){return photoDB.transaction(PHOTO_STORE,mode).objectStore(PHOTO_STORE)}
function getPhotos(section){return new Promise((resolve,reject)=>{const r=photoTx().index('section').getAll(section);r.onsuccess=()=>resolve(r.result||[]);r.onerror=()=>reject(r.error)})}
function addPhoto(section,blob){return new Promise((resolve,reject)=>{const r=photoTx('readwrite').add({section,blob,created:new Date().toISOString()});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
function deletePhoto(id){return new Promise((resolve,reject)=>{const r=photoTx('readwrite').delete(id);r.onsuccess=()=>resolve();r.onerror=()=>reject(r.error)})}
function clearAllPhotos(){if(!photoDB)return;try{photoTx('readwrite').clear()}catch(e){console.error(e)}}
async function compressImage(file){const bmp=await createImageBitmap(file);const max=1600, scale=Math.min(1,max/Math.max(bmp.width,bmp.height));const c=document.createElement('canvas');c.width=Math.round(bmp.width*scale);c.height=Math.round(bmp.height*scale);c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);bmp.close();return await new Promise(r=>c.toBlob(r,'image/jpeg',0.78));}
function photoLabel(key){return key.startsWith('mkt_')?'Foto de Marketing':'Foto del apartado'}
async function renderPhotos(section,mount){const list=mount.querySelector('.photoList'), count=mount.querySelector('.photoCount');const rows=await getPhotos(section);list.innerHTML='';count.textContent=rows.length?`${rows.length} foto${rows.length===1?'':'s'} adjunta${rows.length===1?'':'s'}`:'Sin fotos';for(const row of rows){const item=document.createElement('div');item.className='photoItem';const img=document.createElement('img');const url=URL.createObjectURL(row.blob);img.src=url;img.alt=photoLabel(section);img.onclick=()=>window.open(url,'_blank');const del=document.createElement('button');del.type='button';del.textContent='Eliminar';del.onclick=async()=>{if(confirm('¿Eliminar esta foto?')){URL.revokeObjectURL(url);await deletePhoto(row.id);await renderPhotos(section,mount);}};item.append(img,del);list.append(item)}}
async function setupPhotoMount(mount){const section=mount.dataset.photoKey;mount.innerHTML=`<div class="photoBox"><label class="photoBtn">📷 Hacer / adjuntar foto<input type="file" accept="image/*" capture="environment"></label><span class="photoCount">Sin fotos</span><div class="photoList"></div></div>`;const input=mount.querySelector('input');input.onchange=async()=>{const file=input.files?.[0];if(!file)return;try{const blob=await compressImage(file);await addPhoto(section,blob);await renderPhotos(section,mount);S.textContent='🟢 Foto guardada localmente · '+new Date().toLocaleTimeString('es-ES');}catch(e){console.error(e);alert('No se pudo guardar la foto.');}finally{input.value='';}};await renderPhotos(section,mount)}
(async()=>{try{await openPhotoDB();document.querySelectorAll('.photoMount').forEach(m=>setupPhotoMount(m));}catch(e){console.error(e);S.textContent='🟠 El navegador no pudo iniciar el almacén de fotografías';}})();
