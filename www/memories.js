/* =====================================================
   ðŸ“¸ Ø£ÙŠÙˆØ´ØªÙŠ â€” Ø°ÙƒØ±ÙŠØ§Øª Ø§Ù„Ø±Ø­Ù„Ø© Offline
   Ø§Ù„ØµÙˆØ± ÙˆØ§Ù„ÙÙŠØ¯ÙŠÙˆÙ‡Ø§Øª ØªÙØ­ÙØ¸ Ø¯Ø§Ø®Ù„ ØªØ®Ø²ÙŠÙ† Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ (IndexedDB)
   ===================================================== */

const MASAA_MEDIA_DB = "masaa_memories_db";
const MASAA_MEDIA_STORE = "memories";
let masaaMemoryUrls = [];

function openMasaaMediaDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(MASAA_MEDIA_DB, 1);

        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(MASAA_MEDIA_STORE)) {
                const store = db.createObjectStore(MASAA_MEDIA_STORE, { keyPath: "id" });
                store.createIndex("createdAt", "createdAt", { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error || new Error("ØªØ¹Ø°Ø± ÙØªØ­ Ø§Ù„ØªØ®Ø²ÙŠÙ† Ø§Ù„Ù…Ø­Ù„ÙŠ"));
    });
}

async function saveMasaaMemory(file) {
    const db = await openMasaaMediaDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(MASAA_MEDIA_STORE, "readwrite");
        const store = tx.objectStore(MASAA_MEDIA_STORE);

        const item = {
            id: (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`),
            name: file.name || "Ø°ÙƒØ±Ù‰ Ù…Ù† Ø§Ù„Ø±Ø­Ù„Ø©",
            type: file.type || "application/octet-stream",
            size: file.size || 0,
            createdAt: Date.now(),
            blob: file
        };

        store.put(item);
        tx.oncomplete = () => resolve(item);
        tx.onerror = () => reject(tx.error || new Error("ØªØ¹Ø°Ø± Ø­ÙØ¸ Ø§Ù„Ù…Ù„Ù"));
        tx.onabort = () => reject(tx.error || new Error("ØªÙ… Ø¥Ù„ØºØ§Ø¡ Ø­ÙØ¸ Ø§Ù„Ù…Ù„Ù"));
    });
}

async function getMasaaMemories() {
    const db = await openMasaaMediaDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(MASAA_MEDIA_STORE, "readonly");
        const request = tx.objectStore(MASAA_MEDIA_STORE).getAll();

        request.onsuccess = () => {
            const items = request.result || [];
            items.sort((a, b) => b.createdAt - a.createdAt);
            resolve(items);
        };
        request.onerror = () => reject(request.error || new Error("ØªØ¹Ø°Ø± Ù‚Ø±Ø§Ø¡Ø© Ø§Ù„Ø°ÙƒØ±ÙŠØ§Øª"));
    });
}

async function deleteMasaaMemory(id) {
    const db = await openMasaaMediaDB();

    return new Promise((resolve, reject) => {
        const tx = db.transaction(MASAA_MEDIA_STORE, "readwrite");
        tx.objectStore(MASAA_MEDIA_STORE).delete(id);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error || new Error("ØªØ¹Ø°Ø± Ø­Ø°Ù Ø§Ù„Ø°ÙƒØ±Ù‰"));
    });
}

function formatMasaaSize(bytes) {
    if (!bytes) return "0 MB";
    const mb = bytes / (1024 * 1024);
    if (mb < 1) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`;
}

function clearmasaaMemoryUrls() {
    masaaMemoryUrls.forEach(url => URL.revokeObjectURL(url));
    masaaMemoryUrls = [];
}

function ensureMasaaMemoryControls() {
    const section = document.getElementById("memoriesSection");
    const gallery = document.getElementById("memoriesGallery");
    if (!section || !gallery) return false;

    if (document.getElementById("memoryFilePicker")) return true;

    const controls = document.createElement("div");
    controls.className = "memories-controls";
    controls.innerHTML = `
        <input id="memoryFilePicker" type="file" accept="image/*,video/*" multiple hidden>
        <button class="memory-add-button" type="button" onclick="document.getElementById('memoryFilePicker').click()">
            <span>ï¼‹</span>
            <strong>Ø¥Ø¶Ø§ÙØ© ØµÙˆØ± ÙˆÙÙŠØ¯ÙŠÙˆÙ‡Ø§Øª</strong>
            <small>Ø§Ø®ØªØ§Ø±ÙŠ Ø£ÙŠ Ø¹Ø¯Ø¯ Ù…Ù† Ø§Ù„ØµÙˆØ± ÙˆØ§Ù„ÙÙŠØ¯ÙŠÙˆÙ‡Ø§Øª Ù…Ø±Ø© ÙˆØ§Ø­Ø¯Ø©</small>
        </button>
        <div class="memory-storage-note">ðŸ”’ Ù…Ø­ÙÙˆØ¸Ø© Ø¯Ø§Ø®Ù„ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ ÙˆØªØ¹Ù…Ù„ Ø¨Ø¯ÙˆÙ† Ø¥Ù†ØªØ±Ù†Øª</div>
    `;

    gallery.parentNode.insertBefore(controls, gallery);

    document.getElementById("memoryFilePicker").addEventListener("change", async (event) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) return;

        const button = controls.querySelector(".memory-add-button");
        const oldText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `<span>â³</span><strong>Ø¬Ø§Ø±ÙŠ Ø­ÙØ¸ Ø§Ù„Ø°ÙƒØ±ÙŠØ§Øª...</strong><small>Ù…Ø§ØªÙ‚ÙÙ„ÙŠØ´ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ù„Ø­Ø¯ Ù…Ø§ ÙŠØ®Ù„Øµ Ø§Ù„Ø­ÙØ¸</small>`;

        let saved = 0;
        let failed = 0;

        for (const file of files) {
            try {
                if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) continue;
                await saveMasaaMemory(file);
                saved++;
            } catch (error) {
                console.error("âŒ ØªØ¹Ø°Ø± Ø­ÙØ¸ Ø§Ù„Ù…Ù„Ù:", file.name, error);
                failed++;
            }
        }

        button.disabled = false;
        button.innerHTML = oldText;
        event.target.value = "";
        await loadMasaaMemories();

        if (failed) {
            alert(`ØªÙ… Ø­ÙØ¸ ${saved} Ø°ÙƒØ±Ù‰ØŒ ÙˆØªØ¹Ø°Ø± Ø­ÙØ¸ ${failed} Ù…Ù„Ù. Ù„Ùˆ Ø§Ù„ÙÙŠØ¯ÙŠÙˆÙ‡Ø§Øª ÙƒØ¨ÙŠØ±Ø© Ø¬Ø¯Ù‹Ø§ Ø¬Ø±Ù‘Ø¨ÙŠ Ø¥Ø¶Ø§ÙØªÙ‡Ø§ Ø¹Ù„Ù‰ Ø¯ÙØ¹Ø§Øª.`);
        }
    });

    return true;
}

let masaaMemoryFilter = "all";

function setMasaaMemoryFilter(filter) {
    masaaMemoryFilter = filter;

    document.querySelectorAll("#memoryFilters button").forEach(button => {
        button.classList.toggle("active", button.dataset.filter === filter);
    });

    loadMasaaMemories();
}

async function loadMasaaMemories() {
    const gallery = document.getElementById("memoriesGallery");
    if (!gallery) return;

    ensureMasaaMemoryControls();
    clearmasaaMemoryUrls();

    try {
        const items = await getMasaaMemories();

        const filters = document.getElementById("memoryFilters");
        if (filters) {
            const photoCount = items.filter(item => item.type && item.type.startsWith("image/")).length;
            const videoCount = items.filter(item => item.type && item.type.startsWith("video/")).length;

            const buttons = filters.querySelectorAll("button");
            if (buttons.length >= 3) {
                buttons[0].innerHTML = `Ø§Ù„ÙƒÙ„ <b>${items.length}</b>`;
                buttons[1].innerHTML = `ðŸ“¸ Ø§Ù„ØµÙˆØ± <b>${photoCount}</b>`;
                buttons[2].innerHTML = `ðŸŽ¥ Ø§Ù„ÙÙŠØ¯ÙŠÙˆÙ‡Ø§Øª <b>${videoCount}</b>`;
            }
        }

        if (!items.length) {
            gallery.innerHTML = `
                <div class="memories-empty">
                    <div>ðŸ¤</div>
                    <p>Ù„Ø³Ù‡ Ù…ÙÙŠØ´ Ø°ÙƒØ±ÙŠØ§Øª Ù…Ø¶Ø§ÙØ©</p>
                    <span>Ø§Ø¶ØºØ·ÙŠ Â«Ø¥Ø¶Ø§ÙØ© ØµÙˆØ± ÙˆÙÙŠØ¯ÙŠÙˆÙ‡Ø§ØªÂ» ÙˆØ§Ø®ØªØ§Ø±ÙŠ ÙƒÙ„ Ø°ÙƒØ±ÙŠØ§Øª Ø§Ù„Ø±Ø­Ù„Ø©</span>
                </div>
            `;
            return;
        }

        const visibleItems = masaaMemoryFilter === "photos"
            ? items.filter(item => item.type && item.type.startsWith("image/"))
            : masaaMemoryFilter === "videos"
                ? items.filter(item => item.type && item.type.startsWith("video/"))
                : items;

        gallery.innerHTML = "";

        visibleItems.forEach((item, index) => {
            const url = URL.createObjectURL(item.blob);
            masaaMemoryUrls.push(url);

            const card = document.createElement("article");
            card.className = "memory-card offline-memory-card";

            const isVideo = item.type.startsWith("video/");
            const safeName = (item.name || "Ø°ÙƒØ±Ù‰ Ù…Ù† Ø§Ù„Ø±Ø­Ù„Ø©").replace(/[<>]/g, "");

            if (isVideo) {
                card.innerHTML = `
                    <div class="memory-media-wrap">
                        <video controls playsinline preload="metadata" src="${url}"></video>
                        <span class="memory-type-badge">ðŸŽ¥ ÙÙŠØ¯ÙŠÙˆ</span>
                    </div>
                `;
            } else {
                card.innerHTML = `
                    <div class="memory-media-wrap">
                        <img src="${url}" alt="${safeName}" loading="lazy">
                        <button class="memory-open-button" type="button" aria-label="ÙØªØ­ Ø§Ù„ØµÙˆØ±Ø©">â›¶</button>
                        <span class="memory-type-badge">ðŸ“¸ ØµÙˆØ±Ø©</span>
                    </div>
                `;
                card.querySelector("img").addEventListener("click", () => openMemoryImage(url, safeName));
                card.querySelector(".memory-open-button").addEventListener("click", () => openMemoryImage(url, safeName));
            }

            const info = document.createElement("div");
            info.className = "memory-card-info";
            info.innerHTML = `
                <div class="memory-file-name" title="${safeName}">${safeName}</div>
                <div class="memory-file-size">${formatMasaaSize(item.size)}</div>
            `;

            const deleteButton = document.createElement("button");
            deleteButton.className = "memory-delete-button";
            deleteButton.type = "button";
            deleteButton.textContent = "ðŸ—‘ï¸ Ø­Ø°Ù";
            deleteButton.addEventListener("click", async () => {
                if (!confirm("ØªØ­Ø¨ÙŠ ØªØ­Ø°ÙÙŠ Ø§Ù„Ø°ÙƒØ±Ù‰ Ø¯ÙŠ Ù…Ù† Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ØŸ")) return;
                try {
                    await deleteMasaaMemory(item.id);
                    await loadMasaaMemories();
                } catch (error) {
                    console.error(error);
                    alert("Ø­ØµÙ„ Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø­Ø°Ù.");
                }
            });

            info.appendChild(deleteButton);
            card.appendChild(info);
            gallery.appendChild(card);
        });

    } catch (error) {
        console.error("âŒ Ø®Ø·Ø£ ÙÙŠ ØªØ­Ù…ÙŠÙ„ Ø°ÙƒØ±ÙŠØ§Øª Ø§Ù„Ø±Ø­Ù„Ø©:", error);
        gallery.innerHTML = `
            <div class="memories-empty">
                <div>âš ï¸</div>
                <p>ØªØ¹Ø°Ø± ÙØªØ­ Ø°Ø§ÙƒØ±Ø© Ø§Ù„Ø±Ø­Ù„Ø©</p>
                <span>ØªØ£ÙƒØ¯ÙŠ Ø£Ù† Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ ÙŠØ¹Ù…Ù„ Ø¹Ù„Ù‰ Ø§Ù„Ù…ØªØµÙØ­/Ø§Ù„ØªØ·Ø¨ÙŠÙ‚ Ø¨Ø´ÙƒÙ„ Ø·Ø¨ÙŠØ¹ÙŠ Ø«Ù… Ø¬Ø±Ù‘Ø¨ÙŠ Ù…Ø±Ø© Ø£Ø®Ø±Ù‰</span>
            </div>
        `;
    }
}

function openMemoryImage(src, title) {
    const viewer = document.createElement("div");
    viewer.className = "memory-viewer";
    viewer.innerHTML = `
        <button class="memory-viewer-close" type="button">Ã—</button>
        <img src="${src}" alt="${title || "Ø°ÙƒØ±Ù‰"}">
        <div>${title || ""}</div>
    `;

    viewer.querySelector(".memory-viewer-close").addEventListener("click", () => viewer.remove());
    viewer.addEventListener("click", event => {
        if (event.target === viewer) viewer.remove();
    });
    document.body.appendChild(viewer);
}

function refreshMasaaMemoriesWhenOpened() {
    ensureMasaaMemoryControls();
    loadMasaaMemories();
}

document.addEventListener("DOMContentLoaded", refreshMasaaMemoriesWhenOpened);


