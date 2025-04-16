var allWorks = document.querySelectorAll(".work-carte");

var toggleMenu = function toggleMenu(pop) {
  pop.classList.toggle("is-active");
  document.body.classList.toggle("work-no-scroll");
  document.querySelector("pop-up.is-active").classList.toggle("active");
};

allWorks.forEach(function (workCarte) {
  var pop = workCarte.querySelector(".pop-up");
  var img = workCarte.querySelector(".work-img");
  var ok = workCarte.querySelector(".pop-button");
  var exit = workCarte.querySelector(".pop-cross");
  img.addEventListener("click", () => {
    toggleMenu(pop);
  });
  ok.addEventListener("click", () => {
    toggleMenu(pop);
  });
  exit.addEventListener("click", () => {
    toggleMenu(pop);
  });
  console.log(workCarte);
});

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("l-project-work-background-video");
  const worksContent = document.querySelector('extends[src="works.html"]');
  const projectsContent = document.querySelector(
    'extends[src="projects.html"]'
  );

  // Intensité de l'effet (valeurs différentes pour différentes couches)
  const videoStrength = 20; // Effet plus fort pour l'arrière-plan
  const contentStrength = 10; // Effet plus subtil pour le contenu

  document.addEventListener("mousemove", function (e) {
    // Calculer la position relative de la souris
    const pageX = e.clientX - window.innerWidth / 2;
    const pageY = e.clientY - window.innerHeight / 2;

    // Calculer les déplacements pour différentes couches
    const videoMoveX = (pageX / window.innerWidth) * videoStrength;
    const videoMoveY = (pageY / window.innerHeight) * videoStrength;

    // Déplacement du contenu dans la direction opposée mais avec une intensité moindre
    const contentMoveX = (pageX / window.innerWidth) * contentStrength * -0.3;
    const contentMoveY = (pageY / window.innerHeight) * contentStrength * -0.3;

    // Appliquer les transformations
    video.style.transform = `translate3d(${videoMoveX}px, ${videoMoveY}px, 0) scale(1.05)`;

    // Bouger le contenu HTML
    if (worksContent) {
      worksContent.style.transform = `translate3d(${contentMoveX}px, ${contentMoveY}px, 0)`;
      worksContent.style.transition = "transform 0.2s ease-out";
    }

    if (projectsContent) {
      // Déplacement légèrement différent pour créer plus de profondeur
      projectsContent.style.transform = `translate3d(${contentMoveX * 1.2}px, ${
        contentMoveY * 1.2
      }px, 0)`;
      projectsContent.style.transition = "transform 0.2s ease-out";
    }
  });
});

//effet folders
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner tous les dossiers
  const folders = document.querySelectorAll(".project-all");

  // Configurer l'effet d'empilement (premier en arrière, dernier devant)
  folders.forEach((folder, index) => {
    // Positionner chaque dossier
    folder.style.position = "absolute";
    folder.style.top = index * 20 + "px"; // Décalage vertical
    folder.style.left = index * 10 + "px"; // Décalage horizontal
    folder.style.zIndex = index + 1; // Premier folder = z-index:1, dernier = z-index plus élevé

    // Variables pour gérer le glisser
    let isDragging = false;
    let startY = 0;
    let currentY = 0;
    let isOpen = false; // Pour suivre si le dossier est ouvert (tiré vers le haut)

    // Quand on commence à glisser
    folder.addEventListener("mousedown", function (e) {
      isDragging = true;
      startY = e.clientY;

      // Enlever la transition pour un déplacement plus fluide
      this.style.transition = "none";

      // Éviter la sélection de texte pendant le glisser
      e.preventDefault();
    });

    // Pendant le glissement
    window.addEventListener("mousemove", function (e) {
      if (!isDragging) return;

      // Calculer le déplacement vertical
      currentY = e.clientY - startY;

      // Si on glisse vers le haut (currentY négatif) ou si le dossier est déjà ouvert
      if (currentY < 0 || isOpen) {
        // Pour un dossier déjà ouvert, calculer depuis sa position ouverte
        let translateY;
        if (isOpen) {
          // Si déjà ouvert, on part de -600 et on ajoute le déplacement actuel
          translateY = Math.min(0, -600 + currentY); // Limite supérieure à 0 (position fermée)
          translateY = Math.max(-600, translateY); // Limite inférieure à -600 (position ouverte max)
        } else {
          // Si fermé, déplacement normal vers le haut
          translateY = Math.max(-600, currentY);
        }
        folder.style.transform = `translateY(${translateY}px)`;
      }
    });

    // Quand on arrête de glisser
    window.addEventListener("mouseup", function () {
      if (!isDragging) return;
      isDragging = false;

      // Ajouter une transition pour un retour en douceur
      folder.style.transition = "transform 0.3s ease";

      // Si le dossier était fermé et a été tiré vers le haut suffisamment
      if (!isOpen && currentY < -50) {
        isOpen = true;
        // Laisser le dossier en position ouverte
      }
      // Si le dossier était ouvert et a été tiré vers le bas suffisamment
      else if (isOpen && currentY > 50) {
        isOpen = false;
        folder.style.transform = "translateY(0)";
      }
      // Sinon, remettre à l'état précédent
      else {
        folder.style.transform = isOpen
          ? "translateY(-600px)"
          : "translateY(0)";
      }
    });

    // Effet de survol simple (uniquement pour les dossiers fermés)
    folder.addEventListener("mouseenter", function () {
      if (!isDragging && !isOpen) {
        this.style.transition = "transform 0.3s ease";
        this.style.transform = "translateY(-15px)";
      }
    });

    folder.addEventListener("mouseleave", function () {
      if (!isDragging && !isOpen) {
        this.style.transition = "transform 0.3s ease";
        this.style.transform = "translateY(0)";
      }
    });
  });
});

//folders carousel
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner tous les projets avec des flèches de navigation
  const projectsWithCarousel = document.querySelectorAll(
    ".project-all .project-art:has(.project-arrow-left, .project-arrow-right)"
  );

  // Pour chaque projet avec carousel
  projectsWithCarousel.forEach((project) => {
    const arrowLeft = project.querySelector(".project-arrow-left");
    const arrowRight = project.querySelector(".project-arrow-right");
    const projectSchool = project.querySelector(".project-school");

    // Sauvegarder les éléments originaux (images ou vidéos) pour ce projet
    const originalElements = Array.from(projectSchool.children).map((el) =>
      el.cloneNode(true)
    );

    // Si le projet n'a pas d'éléments ou pas de flèches, on ignore
    if (originalElements.length <= 1 || !arrowLeft || !arrowRight) return;

    let currentIndex = 0;

    // Préserver les classes originales du projectSchool
    const originalClass = projectSchool.className;

    // Fonction pour afficher un seul élément à la fois
    function showElement(index) {
      // Vider le conteneur
      projectSchool.innerHTML = "";

      // Ajouter l'élément actuel
      const element = originalElements[index].cloneNode(true);

      // S'assurer que les styles sont appliqués correctement
      projectSchool.className = originalClass;

      // Ajouter l'élément au container
      projectSchool.appendChild(element);

      // Ajuster la taille pour s'assurer que l'élément reste dans son conteneur
      const elementToAdjust = projectSchool.firstChild;
      if (elementToAdjust) {
        // Appliquer un style max-width et max-height pour s'assurer que l'élément reste dans le conteneur
        elementToAdjust.style.maxWidth = "100%";
        elementToAdjust.style.maxHeight = "100%";
        elementToAdjust.style.objectFit = "contain";
      }
    }

    // Initialiser avec le premier élément seulement
    showElement(currentIndex);

    // Gestionnaire d'événement pour la flèche gauche
    arrowLeft.addEventListener("click", function () {
      currentIndex =
        currentIndex === 0 ? originalElements.length - 1 : currentIndex - 1;
      showElement(currentIndex);
    });

    // Gestionnaire d'événement pour la flèche droite
    arrowRight.addEventListener("click", function () {
      currentIndex =
        currentIndex === originalElements.length - 1 ? 0 : currentIndex + 1;
      showElement(currentIndex);
    });
  });
});

//image
document.addEventListener("DOMContentLoaded", function () {
  // Récupération des éléments
  const image = document.querySelector(".pop-art-img");
  const zoomOut = document.querySelector(".pop-minus");
  const zoomIn = document.querySelector(".pop-plus");

  // Variables pour le zoom et le déplacement
  let scale = 1;
  let isDragging = false;
  let startX,
    startY,
    translateX = 0,
    translateY = 0;

  // Fonction zoom in
  zoomIn.addEventListener("click", function () {
    if (scale < 3) {
      scale += 0.2;
      updateImageTransform();
    }
  });

  // Fonction zoom out
  zoomOut.addEventListener("click", function () {
    if (scale > 0.5) {
      scale -= 0.2;
      updateImageTransform();
    }
  });

  // Début du déplacement
  image.addEventListener("mousedown", function (e) {
    if (scale > 1) {
      // Permettre le déplacement seulement si l'image est zoomée
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      image.classList.add("grabbing");
      e.preventDefault();
    }
  });

  // Pendant le déplacement
  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;

      // Limiter le déplacement pour que l'image ne sorte pas trop du cadre
      const container = document.querySelector(".pop-art");
      const containerRect = container.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();

      // Calculer les limites de déplacement
      const maxTranslateX = (imageRect.width * scale - containerRect.width) / 2;
      const maxTranslateY =
        (imageRect.height * scale - containerRect.height) / 2;

      // Appliquer les limites
      if (maxTranslateX > 0) {
        translateX = Math.max(
          -maxTranslateX,
          Math.min(translateX, maxTranslateX)
        );
      } else {
        translateX = 0;
      }

      if (maxTranslateY > 0) {
        translateY = Math.max(
          -maxTranslateY,
          Math.min(translateY, maxTranslateY)
        );
      } else {
        translateY = 0;
      }

      updateImageTransform();
    }
  });

  // Fin du déplacement
  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
      image.classList.remove("grabbing");
    }
  });

  // Mettre à jour la transformation de l'image
  function updateImageTransform() {
    image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

    // Activer/désactiver le déplacement en fonction du zoom
    if (scale > 1) {
      image.style.cursor = "grab";
    } else {
      image.style.cursor = "default";
      translateX = 0;
      translateY = 0;
      updateImageTransform();
    }
  }
});
