const WHATSAPP_NUMBER = "5521000000000"; // Número demonstrativo. Substitua pelo número real com DDI + DDD.

const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const bookingForm = document.querySelector('#booking-form');
const bookingDialog = document.querySelector('#booking-dialog');
const dialogClose = document.querySelector('.dialog-close');
const bookingSummary = document.querySelector('#booking-summary');
const whatsappLink = document.querySelector('#whatsapp-link');
const copyButton = document.querySelector('#copy-message');
const dateInput = document.querySelector('input[name="date"]');
let currentMessage = '';

function setMinBookingDate(){const today=new Date();const local=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().split('T')[0];dateInput.min=local;}
function toggleMenu(forceOpen){const isOpen=typeof forceOpen==='boolean'?forceOpen:menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(isOpen));menuButton.setAttribute('aria-label',isOpen?'Fechar menu':'Abrir menu');nav.classList.toggle('open',isOpen);document.body.classList.toggle('menu-open',isOpen);}
menuButton.addEventListener('click',()=>toggleMenu());
navLinks.forEach(link=>link.addEventListener('click',()=>toggleMenu(false)));
window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',window.scrollY>24);},{passive:true});

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

function formatDate(dateString){const [year,month,day]=dateString.split('-');return `${day}/${month}/${year}`;}
bookingForm.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(bookingForm);const name=data.get('name').trim();const phone=data.get('phone').trim();const service=data.get('service');const date=data.get('date');const time=data.get('time');const barber=data.get('barber');currentMessage=['Olá! Gostaria de solicitar um horário na Imperium Barbearia.','',`Nome: ${name}`,`Telefone: ${phone}`,`Serviço: ${service}`,`Data: ${formatDate(date)}`,`Horário: ${time}`,`Barbeiro: ${barber}`,'','Pode confirmar a disponibilidade, por favor?'].join('\n');bookingSummary.textContent=currentMessage;whatsappLink.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(currentMessage)}`;bookingDialog.showModal();});
dialogClose.addEventListener('click',()=>bookingDialog.close());
bookingDialog.addEventListener('click',event=>{const rect=bookingDialog.getBoundingClientRect();const outside=event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom;if(outside)bookingDialog.close();});
copyButton.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(currentMessage);const original=copyButton.textContent;copyButton.textContent='Mensagem copiada ✓';setTimeout(()=>{copyButton.textContent=original;},1800);}catch{copyButton.textContent='Não foi possível copiar';}});
setMinBookingDate();