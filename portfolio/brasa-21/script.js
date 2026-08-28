const WHATSAPP_NUMBER='5521000000000';
const DELIVERY_FEE=6;
const menu=[
{id:1,name:'Brasa Smash',category:'burgers',price:24.9,emoji:'🍔',tag:'mais pedido',desc:'Pão brioche, smash 120g, queijo, cebola tostada, picles e molho da casa.'},
{id:2,name:'Duplo 21',category:'burgers',price:34.9,emoji:'🍔',tag:'duplo',desc:'Dois smash 120g, queijo duplo, bacon crocante, picles e molho 21.'},
{id:3,name:'Fogo Alto',category:'burgers',price:31.9,emoji:'🌶️',tag:'picante',desc:'Smash 150g, queijo, jalapeño, cebola roxa, crispy e maionese picante.'},
{id:4,name:'Frango Crocante',category:'burgers',price:27.9,emoji:'🍗',tag:'crunch',desc:'Frango empanado, queijo, alface, picles e maionese de páprica.'},
{id:5,name:'Batata Brasa',category:'acompanhamentos',price:16.9,emoji:'🍟',tag:'crocante',desc:'Batata frita sequinha com sal da casa e páprica defumada.'},
{id:6,name:'Batata Cheddar',category:'acompanhamentos',price:23.9,emoji:'🍟',tag:'carregada',desc:'Batata frita, cheddar cremoso, bacon crocante e cebolinha.'},
{id:7,name:'Onion Rings',category:'acompanhamentos',price:18.9,emoji:'🧅',tag:'porção',desc:'Anéis de cebola empanados, crocantes e acompanhados de molho da casa.'},
{id:8,name:'Cola Lata',category:'bebidas',price:7.5,emoji:'🥤',tag:'350 ml',desc:'Refrigerante gelado em lata.'},
{id:9,name:'Limonada 21',category:'bebidas',price:10.9,emoji:'🍋',tag:'400 ml',desc:'Limonada da casa batida na hora, cítrica e refrescante.'},
{id:10,name:'Brownie Brasa',category:'sobremesas',price:15.9,emoji:'🍫',tag:'doce',desc:'Brownie de chocolate com calda cremosa e farofa crocante.'}
];
let cart=JSON.parse(localStorage.getItem('brasa21-cart')||'[]');
let activeCategory='todos';
const menuGrid=document.querySelector('#menu-grid');
const filters=document.querySelector('#filters');
const cartDrawer=document.querySelector('#cart-drawer');
const cartButton=document.querySelector('#cart-button');
const cartClose=document.querySelector('#cart-close');
const backdrop=document.querySelector('#backdrop');
const cartItems=document.querySelector('#cart-items');
const emptyCart=document.querySelector('#empty-cart');
const cartCount=document.querySelector('#cart-count');
const subtotalEl=document.querySelector('#subtotal');
const deliveryFeeEl=document.querySelector('#delivery-fee');
const grandTotalEl=document.querySelector('#grand-total');
const checkoutForm=document.querySelector('#checkout-form');
const deliveryFields=document.querySelector('#delivery-fields');
const storeStatus=document.querySelector('#store-status');
const statusDot=document.querySelector('.status-dot');
const money=value=>value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

function renderFilters(){const cats=[['todos','Todos'],['burgers','Burgers'],['acompanhamentos','Acompanhamentos'],['bebidas','Bebidas'],['sobremesas','Sobremesas']];filters.innerHTML=cats.map(([value,label])=>`<button class="filter-button ${activeCategory===value?'active':''}" data-filter="${value}" type="button">${label}</button>`).join('');filters.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{activeCategory=btn.dataset.filter;renderFilters();renderMenu();}));}
function renderMenu(){const items=activeCategory==='todos'?menu:menu.filter(item=>item.category===activeCategory);menuGrid.innerHTML=items.map(item=>`<article class="food-card reveal visible"><div class="food-visual"><span class="food-emoji" aria-hidden="true">${item.emoji}</span></div><div class="food-body"><div class="food-meta"><h3>${item.name}</h3><span class="price">${money(item.price)}</span></div><p>${item.desc}</p><div class="food-actions"><span class="tag">${item.tag}</span><button class="add-button" type="button" data-add="${item.id}" aria-label="Adicionar ${item.name} ao carrinho">+</button></div></div></article>`).join('');menuGrid.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>addToCart(Number(btn.dataset.add))));}
function saveCart(){localStorage.setItem('brasa21-cart',JSON.stringify(cart));}
function addToCart(id){const found=cart.find(item=>item.id===id);if(found)found.qty+=1;else cart.push({id,qty:1});saveCart();renderCart();openCart();}
function changeQty(id,delta){const found=cart.find(item=>item.id===id);if(!found)return;found.qty+=delta;if(found.qty<=0)cart=cart.filter(item=>item.id!==id);saveCart();renderCart();}
function removeItem(id){cart=cart.filter(item=>item.id!==id);saveCart();renderCart();}
function cartSubtotal(){return cart.reduce((sum,line)=>{const product=menu.find(p=>p.id===line.id);return sum+(product?product.price*line.qty:0);},0);}
function isDelivery(){return checkoutForm.elements.fulfillment.value==='entrega';}
function renderCart(){cartItems.innerHTML=cart.map(line=>{const item=menu.find(p=>p.id===line.id);if(!item)return'';return `<div class="cart-item"><div><h3>${item.name}</h3><small>${money(item.price)} cada</small><div class="qty"><button type="button" data-qty="${item.id}" data-delta="-1">−</button><strong>${line.qty}</strong><button type="button" data-qty="${item.id}" data-delta="1">+</button></div><button class="remove" type="button" data-remove="${item.id}">remover</button></div><strong>${money(item.price*line.qty)}</strong></div>`;}).join('');cartItems.querySelectorAll('[data-qty]').forEach(btn=>btn.addEventListener('click',()=>changeQty(Number(btn.dataset.qty),Number(btn.dataset.delta))));cartItems.querySelectorAll('[data-remove]').forEach(btn=>btn.addEventListener('click',()=>removeItem(Number(btn.dataset.remove))));const count=cart.reduce((sum,line)=>sum+line.qty,0);cartCount.textContent=count;emptyCart.hidden=cart.length>0;checkoutForm.hidden=cart.length===0;updateTotals();}
function updateTotals(){const subtotal=cartSubtotal();const fee=isDelivery()&&subtotal>0?DELIVERY_FEE:0;subtotalEl.textContent=money(subtotal);deliveryFeeEl.textContent=fee?money(fee):'R$ 0,00';grandTotalEl.textContent=money(subtotal+fee);}
function openCart(){cartDrawer.classList.add('open');cartDrawer.setAttribute('aria-hidden','false');cartButton.setAttribute('aria-expanded','true');backdrop.hidden=false;document.body.classList.add('cart-open');cartClose.focus();}
function closeCart(){cartDrawer.classList.remove('open');cartDrawer.setAttribute('aria-hidden','true');cartButton.setAttribute('aria-expanded','false');backdrop.hidden=true;document.body.classList.remove('cart-open');cartButton.focus();}
cartButton.addEventListener('click',openCart);cartClose.addEventListener('click',closeCart);backdrop.addEventListener('click',closeCart);document.querySelectorAll('[data-open-cart]').forEach(btn=>btn.addEventListener('click',openCart));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&cartDrawer.classList.contains('open'))closeCart();});
checkoutForm.querySelectorAll('input[name="fulfillment"]').forEach(input=>input.addEventListener('change',()=>{const delivery=isDelivery();deliveryFields.hidden=!delivery;checkoutForm.elements.address.required=delivery;updateTotals();}));
checkoutForm.addEventListener('submit',event=>{event.preventDefault();if(!cart.length)return;const data=new FormData(checkoutForm);const delivery=isDelivery();const subtotal=cartSubtotal();const fee=delivery?DELIVERY_FEE:0;const lines=cart.map(line=>{const item=menu.find(p=>p.id===line.id);return `• ${line.qty}x ${item.name} — ${money(item.price*line.qty)}`;});const message=['Olá! Quero fazer um pedido na Brasa 21.','',...lines,'',`Subtotal: ${money(subtotal)}`,`Entrega: ${delivery?money(fee):'Retirada no balcão'}`,`Total: ${money(subtotal+fee)}`,'',`Nome: ${data.get('name')}`,`Recebimento: ${delivery?'Entrega':'Retirada'}`,delivery?`Endereço: ${data.get('address')}`:null,`Pagamento: ${data.get('payment')}`,data.get('note')?`Observação: ${data.get('note')}`:null,'','Pode confirmar o pedido, por favor?'].filter(Boolean).join('\n');window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');});
function setStoreStatus(){const now=new Date();const day=now.getDay();const hour=now.getHours()+now.getMinutes()/60;const open=day!==1&&hour>=18&&hour<23.5;storeStatus.textContent=open?'Aberto agora':'Fechado agora • abre às 18h';statusDot.classList.toggle('closed',!open);}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
renderFilters();renderMenu();renderCart();setStoreStatus();