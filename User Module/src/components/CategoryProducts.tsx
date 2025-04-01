import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { BestSellerProduct } from "@/components/BestSellerCard";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    rating: number;
    isOrganic: boolean;
    unit: string;
}

const demoProducts: Product[] = [
    // Atta, Rice & Dal
    { id: 1, name: "Wheat Flour", description: "Premium quality atta", price: 2.99, oldPrice: 3.49, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "atta-rice-dal", rating: 4.5, isOrganic: true, unit: "5kg" },
    { id: 2, name: "Basmati Rice", description: "Long grain basmati", price: 1.99, oldPrice: 2.49, image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "atta-rice-dal", rating: 4.2, isOrganic: true, unit: "5kg" },
    { id: 3, name: "Toor Dal", description: "Premium quality dal", price: 1.49, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "atta-rice-dal", rating: 4.3, isOrganic: true, unit: "1kg" },

    // Masala, Oil & More
    { id: 4, name: "Turmeric Powder", description: "Pure haldi powder", price: 5.99, image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "masala-oil-more", rating: 4.8, isOrganic: true, unit: "200g" },
    { id: 5, name: "Mustard Oil", description: "Pure mustard oil", price: 12.99, image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "masala-oil-more", rating: 4.9, isOrganic: true, unit: "1L" },
    { id: 6, name: "Garam Masala", description: "Authentic spice blend", price: 3.49, image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "masala-oil-more", rating: 4.7, isOrganic: true, unit: "100g" },

    // Snacks
    { id: 7, name: "Potato Chips", description: "Crunchy potato chips", price: 2.49, image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "snacks", rating: 4.5, isOrganic: false, unit: "150g" },
    { id: 8, name: "Namkeen Mix", description: "Spicy Indian snack", price: 3.49, image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "snacks", rating: 4.6, isOrganic: false, unit: "200g" },

    // Cold Drinks & Juices
    { id: 9, name: "Cola", description: "Refreshing cola drink", price: 1.99, image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "cold-drinks-juices", rating: 4.3, isOrganic: false, unit: "750ml" },
    { id: 10, name: "Mango Juice", description: "Pure mango juice", price: 2.99, image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "cold-drinks-juices", rating: 4.7, isOrganic: true, unit: "1L" },

    // Tea, Coffee & More
    { id: 11, name: "Assam Tea", description: "Premium tea leaves", price: 4.99, image: "https://images.unsplash.com/photo-1428660386617-8d277e7deaf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "tea-coffee-more", rating: 4.8, isOrganic: true, unit: "250g" },
    { id: 12, name: "Filter Coffee", description: "South Indian coffee", price: 7.99, image: "https://images.unsplash.com/photo-1428660386617-8d277e7deaf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "tea-coffee-more", rating: 4.9, isOrganic: true, unit: "500g" },

    // Bakery & Biscuit
    { id: 13, name: "Whole Wheat Bread", description: "Healthy bread", price: 2.49, image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "bakery-biscuit", rating: 4.5, isOrganic: true, unit: "400g" },
    { id: 14, name: "Marie Biscuit", description: "Classic tea biscuit", price: 1.99, image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "bakery-biscuit", rating: 4.6, isOrganic: false, unit: "200g" },

    // Chocolates
    { id: 15, name: "Milk Chocolate", description: "Creamy milk chocolate", price: 3.99, image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "chocolates", rating: 4.7, isOrganic: false, unit: "100g" },
    { id: 16, name: "Dark Chocolate", description: "70% cocoa dark", price: 4.49, image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "chocolates", rating: 4.8, isOrganic: true, unit: "100g" },

    // Home Essential
    { id: 17, name: "Laundry Detergent", description: "Eco-friendly detergent", price: 6.99, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "home-essential", rating: 4.6, isOrganic: false, unit: "1L" },
    { id: 18, name: "Dish Soap", description: "Natural dishwashing soap", price: 3.49, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80", category: "home-essential", rating: 4.5, isOrganic: false, unit: "500ml" }
];

interface CategoryProductsProps {
  cartItems: BestSellerProduct[];
  onAddToCart: (product: BestSellerProduct, quantity: number) => void;
  onUpdateCart: (productId: number, quantity: number) => void;
  onRemoveFromCart: (productId: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  selectedAddress: string;
  isLoggedIn: boolean;
  onLoginClick: () => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
  onAddressChange: (address: string) => void;
}

const CategoryProducts = ({
  cartItems,
  onAddToCart,
  onUpdateCart,
  onRemoveFromCart,
  isCartOpen,
  toggleCart,
  selectedAddress,
  isLoggedIn,
  onLoginClick,
  user,
  onLogout,
  onAddressChange,
}: CategoryProductsProps) => {
    const { category } = useParams<{ category: string }>();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    const filteredProducts = demoProducts.filter(
        (product) =>
      product.category === category &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        toggleCart={toggleCart} 
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={onLogout}
        selectedAddress={selectedAddress}
        onAddressChange={onAddressChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
        <h1 className="text-2xl font-bold mb-4 capitalize">
          {category?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")} Products
        </h1>

                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={onAddToCart}
                toggleCart={toggleCart}
              />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        cartItems={cartItems}
        updateQuantity={onUpdateCart}
        removeFromCart={onRemoveFromCart}
        selectedAddress={selectedAddress}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
      />
        </div>
    );
};

export default CategoryProducts;