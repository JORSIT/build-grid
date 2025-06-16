# build-grid


## Quick Start

1. **Clone the Repo**  
   ```bash
   git clone https://github.com/JORSIT/build-grid.git
   cd build-grid
   ```

2. **Create a Feature Branch**  
   ```bash
   git checkout -b feature/your-app-name
   ```

3. **Add Your Mini-App**  
   - Create a new file at `apps/yourApp.js`;  (you can use your name)
   - In `index.html`, under the `<div class="apps-grid">` section, insert:

     ```html
     <div class="app-card implemented">
       <div class="status-badge">LIVE</div>
       <div class="app-name">Your App Name</div>
       <div class="app-description">A brief description of your app.</div>
       <button class="app-button" onclick="showApp('yourAppName')">
         Launch App
       </button>
     </div>
     ```

4. **Push & Open a Pull Request**  
   ```bash
   git add .
   git commit -m "feat(apps): add Your App Name"
   git push origin feature/your-app-name
   ```




5. **Wait for Review**
   - Wait for feedback on your PR and address any requested changes.


6. **Explore the Demo**  

   - Visit the live demo to see your work and your collegues': https://jorsit.github.io/build-grid/