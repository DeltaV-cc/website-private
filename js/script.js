function drawTriangle(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { offsetWidth: width, offsetHeight: height } = canvas.parentElement;

    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.8;
    const halfSize = size / 2;
    const heightFactor = Math.sqrt(3) / 2;

    const top = [centerX, centerY - halfSize * heightFactor];
    const bottomLeft = [centerX - halfSize, centerY + halfSize * heightFactor];
    const bottomRight = [centerX + halfSize, centerY + halfSize * heightFactor];

    let pulse = 0;

    function animate() {
        ctx.clearRect(0, 0, width, height);
        pulse = (pulse + 0.05) % (2 * Math.PI);
        const lineWidth = 2 + Math.sin(pulse) * 1;

        ctx.beginPath();
        ctx.moveTo(top[0], top[1]);
        ctx.lineTo(bottomLeft[0], bottomLeft[1]);
        ctx.lineTo(bottomRight[0], bottomRight[1]);
        ctx.closePath();

        ctx.strokeStyle = '#D3D3D3';
        ctx.lineWidth = lineWidth;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#0000FF';
        ctx.stroke();

        requestAnimationFrame(animate);
    }

    animate();
}

drawTriangle('triangleCanvas');

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.addEventListener('click', (event) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) modal.style.display = 'none';
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});