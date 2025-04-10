const header = document.querySelector("header");

window.addEventListener ("scroll", function(){
    header.classList.toggle ("sticky", this.window.scrolly > 0);
})



document.addEventListener('DOMContentLoaded', function() {
    // ========== Menu Mobile ==========
    const menuIcon = document.getElementById('menu-icon');
    const menu1 = document.querySelector('.menu1');
    
    if(menuIcon && menu1) {
        menuIcon.addEventListener('click', function() {
            menu1.classList.toggle('active');
        });
    }

    // ========== Favoritos (coração) ==========
    const heartIcons = document.querySelectorAll('.icone-coração i');
    
    heartIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.classList.toggle('bxs-heart');
            this.classList.toggle('bx-heart');
            
            if(this.classList.contains('bxs-heart')) {
                // Adicionar aos favoritos
                console.log('Produto favoritado!');
            } else {
                // Remover dos favoritos
                console.log('Produto desfavoritado!');
            }
        });
    });

    // ========== Efeito de Zoom nos Produtos ==========
    const produtos = document.querySelectorAll('.produtos1');
    
    produtos.forEach(produto => {
        produto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        produto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // ========== Carrossel de Produtos ==========
    let currentIndex = 0;
    const produtosContainer = document.querySelector('.produtos');
    const produtosItems = document.querySelectorAll('.produtos1');
    const totalItems = produtosItems.length;
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    }
    
    function updateCarousel() {
        const offset = -currentIndex * 100;
        produtosContainer.style.transform = `translateX(${offset}%)`;
    }
    
    // Adicione botões de navegação no HTML ou use setInterval para auto-play
    // setInterval(nextSlide, 3000);

    // ========== Scroll Suave ==========
    const downArrow = document.querySelector('.down-arrow a');
    
    if(downArrow) {
        downArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }

    // ========== Newsletter Form ==========
    const newsletterForm = document.querySelector('.informação5');
    
    if(newsletterForm) {
        const form = document.createElement('form');
        form.innerHTML = `
            <input type="email" placeholder="Seu e-mail" required>
            <button type="submit">Inscrever</button>
        `;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            if(validateEmail(email)) {
                alert('Obrigado por se inscrever! Você receberá nossas novidades em breve.');
                this.querySelector('input').value = '';
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
        
        newsletterForm.appendChild(form);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ========== Header Sticky ==========
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 100) {
            header.classList.add('sticky-active');
        } else {
            header.classList.remove('sticky-active');
        }
    });

    // ========== Adicionar ao Carrinho ==========
    const cartIcons = document.querySelectorAll('.bx-cart');
    
    cartIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar a lógica para adicionar ao carrinho
            console.log('Produto adicionado ao carrinho!');
            
            // Efeito visual
            const cartNotification = document.createElement('span');
            cartNotification.className = 'cart-notification';
            cartNotification.textContent = '+1';
            this.appendChild(cartNotification);
            
            setTimeout(() => {
                cartNotification.remove();
            }, 1000);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (mantenha todo o código anterior)

    // ========== Carrinho de Compras ==========
    const cartOverlay = document.querySelector('.cart-overlay');
    const cart = document.querySelector('.cart');
    const cartContent = document.querySelector('.cart-content');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.bx-cart');
    const closeCart = document.querySelector('.close-cart');
    const clearCartBtn = document.querySelector('.clear-cart');
    const checkoutBtn = document.querySelector('.checkout');
    
    // Array para armazenar os itens do carrinho
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Adicionar contador ao ícone do carrinho
    function updateCartCount() {
        const count = cartItems.reduce((total, item) => total + item.amount, 0);
        let cartCount = document.querySelector('.cart-count');
        
        if (count > 0) {
            if (!cartCount) {
                cartCount = document.createElement('span');
                cartCount.className = 'cart-count';
                cartIcon.appendChild(cartCount);
            }
            cartCount.textContent = count;
        } else if (cartCount) {
            cartCount.remove();
        }
    }
    
    // Atualizar o carrinho na tela
    function displayCart() {
        cartContent.innerHTML = '';
        
        if (cartItems.length === 0) {
            cartContent.innerHTML = '<p>Seu carrinho está vazio</p>';
            cartTotal.textContent = '0';
            return;
        }
        
        let total = 0;
        
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            // Extrai o preço numérico (remove "R$" e converte para número)
            const price = parseFloat(item.price.replace('R$', '').replace(',', '.').trim());
            const itemTotal = price * item.amount;
            total += itemTotal;
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.price}</p>
                    <p>Quantidade: ${item.amount}</p>
                    <p class="remove-item" data-id="${index}">Remover</p>
                </div>
            `;
            
            cartContent.appendChild(cartItem);
        });
        
        cartTotal.textContent = total.toFixed(2).replace('.', ',');
        
        // Adiciona eventos aos botões de remover
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-id'));
                removeItem(index);
            });
        });
    }
    
    // Adicionar item ao carrinho
    function addToCart(title, price, image) {
        const existingItem = cartItems.find(item => item.title === title);
        
        if (existingItem) {
            existingItem.amount += 1;
        } else {
            cartItems.push({
                title,
                price,
                image,
                amount: 1
            });
        }
        
        saveCart();
        displayCart();
        updateCartCount();
    }
    
    // Remover item do carrinho
    function removeItem(index) {
        cartItems.splice(index, 1);
        saveCart();
        displayCart();
        updateCartCount();
    }
    
    // Limpar carrinho
    function clearCart() {
        cartItems = [];
        saveCart();
        displayCart();
        updateCartCount();
    }
    
    // Salvar carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    
    // Event Listeners
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        cartOverlay.classList.add('show');
        displayCart();
    });
    
    closeCart.addEventListener('click', function() {
        cartOverlay.classList.remove('show');
    });
    
    clearCartBtn.addEventListener('click', clearCart);
    
    checkoutBtn.addEventListener('click', function() {
        alert('Compra finalizada! Obrigado por sua compra.');
        clearCart();
        cartOverlay.classList.remove('show');
    });
    
    // Adicionar evento de clique aos botões de compra (precisa adicionar a classe "add-to-cart" aos produtos)
    document.querySelectorAll('.produtos1').forEach(product => {
        const addBtn = document.createElement('button');
        addBtn.className = 'add-to-cart';
        addBtn.textContent = 'Adicionar ao Carrinho';
        
        addBtn.addEventListener('click', function() {
            const title = product.querySelector('h4').textContent;
            const price = product.querySelector('p').textContent.split('-')[0].trim(); // Pega o primeiro preço
            const image = product.querySelector('img').src;
            
            addToCart(title, price, image);
            
            // Efeito visual
            const notification = document.createElement('span');
            notification.className = 'cart-notification';
            notification.textContent = '+1';
            cartIcon.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 1000);
        });
        
        product.appendChild(addBtn);
    });
    
    // Inicializar carrinho
    updateCartCount();
    
    // ... (restante do seu código existente)
});

document.addEventListener('DOMContentLoaded', function() {
    // ... (mantenha todo o código anterior)

    // ========== Filtros de Produtos ==========
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const priceSlider = document.querySelector('#price-slider');
    const priceMaxDisplay = document.querySelector('#price-max');
    
    // Atualiza o valor máximo do preço exibido
    priceSlider.addEventListener('input', function() {
        priceMaxDisplay.textContent = `R$${this.value}`;
    });
    
    // Aplica os filtros
    function applyFilters() {
        // Obter categorias selecionadas
        const selectedCategories = [];
        document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
            selectedCategories.push(checkbox.value);
        });
        
        // Obter preço máximo
        const maxPrice = parseInt(priceSlider.value);
        
        // Filtrar produtos
        document.querySelectorAll('.produtos1').forEach(product => {
            const productCategory = product.querySelector('h4').textContent.includes('Masculino') ? 'Masculino' : 
                                  product.querySelector('h4').textContent.includes('Feminino') ? 'Feminino' :
                                  product.querySelector('h4').textContent.includes('Infantil') ? 'Infantil' : 'Ofertas';
            
            // Extrai o preço numérico (pega o primeiro preço se for um range)
            const priceText = product.querySelector('p').textContent.split('-')[0].trim();
            const productPrice = parseFloat(priceText.replace('R$', '').replace(',', '.').trim());
            
            // Verifica se o produto passa nos filtros
            const categoryMatch = selectedCategories.includes(productCategory);
            const priceMatch = productPrice <= maxPrice;
            
            if (categoryMatch && priceMatch) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });
    }
    
    // Reseta os filtros
    function resetFilters() {
        // Marcar todas as categorias
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // Resetar slider de preço
        priceSlider.value = 200;
        priceMaxDisplay.textContent = 'R$200';
        
        // Mostrar todos os produtos
        document.querySelectorAll('.produtos1').forEach(product => {
            product.classList.remove('hidden');
        });
    }
    
    // Event listeners
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // ... (restante do seu código existente)
});

// ========== Modal de Visualização Rápida ==========
const quickviewModal = document.querySelector('.quickview-modal');
const quickviewOverlay = document.querySelector('.quickview-overlay');
const closeQuickview = document.querySelector('.close-quickview');
const quickviewImage = document.getElementById('quickview-image');
const quickviewTitle = document.getElementById('quickview-title');
const quickviewPrice = document.getElementById('quickview-price');
const addToCartQuickview = document.querySelector('.add-to-cart-quickview');
const quantityInput = document.querySelector('.quantity-input');
const quantityMinus = document.querySelector('.quantity-minus');
const quantityPlus = document.querySelector('.quantity-plus');

// Abrir modal de visualização rápida
function openQuickview(product) {
    const productImg = product.querySelector('img').src;
    const productTitle = product.querySelector('h4').textContent;
    const productPrice = product.querySelector('p').textContent;
    
    quickviewImage.src = productImg;
    quickviewTitle.textContent = productTitle;
    quickviewPrice.textContent = productPrice;
    
    quickviewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeQuickviewModal() {
    quickviewModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners para abrir modal
document.querySelectorAll('.produtos1').forEach(product => {
    product.addEventListener('click', function(e) {
        // Evitar abrir modal se clicar em botões específicos
        if (!e.target.classList.contains('add-to-cart') && 
            !e.target.classList.contains('bx-heart') &&
            !e.target.classList.contains('bxs-heart')) {
            openQuickview(this);
        }
    });
});

// Fechar modal ao clicar no overlay ou no X
quickviewOverlay.addEventListener('click', closeQuickviewModal);
closeQuickview.addEventListener('click', closeQuickviewModal);

// Controle de quantidade
quantityMinus.addEventListener('click', function() {
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

quantityPlus.addEventListener('click', function() {
    quantityInput.value = parseInt(quantityInput.value) + 1;
});

// Adicionar ao carrinho a partir do modal
addToCartQuickview.addEventListener('click', function() {
    const quantity = parseInt(quantityInput.value);
    
    for (let i = 0; i < quantity; i++) {
        addToCart(
            quickviewTitle.textContent,
            quickviewPrice.textContent,
            quickviewImage.src
        );
    }
    
    // Feedback visual
    const notification = document.createElement('span');
    notification.className = 'cart-notification';
    notification.textContent = `+${quantity}`;
    cartIcon.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 1000);
    
    closeQuickviewModal();
});

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && quickviewModal.classList.contains('active')) {
        closeQuickviewModal();
    }
});
