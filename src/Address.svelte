<aside><p><slot /></p></aside>

<style>
    aside {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.8);
        padding: 0em 1em;
        border-radius: 10px;
    }

    @media (max-width: 640px) {
        p {
            font-size: 0.8em;
        }
    }
</style>