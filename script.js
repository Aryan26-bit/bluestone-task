let images = [];
let currentIndex = 0;
let cart = [];

async function fetchImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=5"
    );
    const data = await response.json();
    images = data.map((img) => img.download_url);
    updateCarousel();
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

function updateCarousel() {
  document.getElementById("mainImage").src = images[currentIndex];
  const thumbnailsContainer = document.getElementById("thumbnails");
  thumbnailsContainer.innerHTML = "";

  images.forEach((img, index) => {
    let thumb = document.createElement("img");
    thumb.src = img;
    thumb.className = "thumbnail";
    thumb.onclick = () => {
      currentIndex = index;
      updateCarousel();
    };
    thumbnailsContainer.appendChild(thumb);
  });
}

// Carousel navigation
function prevImage() {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  updateCarousel();
}

function nextImage() {
  currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  updateCarousel();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function addToCart() {
  const productName = document.getElementById("product-name").innerText;
  const productPrice = document.getElementById("product-price").innerText;
  const variant = document.getElementById("variant").value;

  cart.push({ name: productName, price: productPrice, variant });
  updateCartUI();
  showToast("Added to cart!");
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - ${item.variant} - ${item.price}`;
    cartItems.appendChild(li);
  });
  cartCount.innerText = cart.length;
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchImages();
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").classList.remove("hidden");
    document.getElementById("carouselContainer").classList.remove("hidden");
  }, 2000);
});
