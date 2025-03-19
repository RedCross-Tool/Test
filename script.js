// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to load content
    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                document.getElementById('content').innerHTML = html;
                if (page === 'input.html') {
                    setupForm();
                }
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // Function to setup form submission
    function setupForm() {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                loadContent('output.html');
            });
        }
    }

    // Initial page load
    loadContent('index.html');

    // Navigation event listeners
    document.body.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            loadContent(e.target.getAttribute('href'));
        }
    });
});
