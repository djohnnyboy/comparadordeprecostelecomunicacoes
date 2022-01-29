<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
        <meta http-equiv="Cache-control" content="public">
        <meta name="description" content="Comparador de preços de telecomunicações"/>
        <meta name="keywords" content="comparador, comparador de preços, comparador preços, preços telecomunicações, comparador preços bancos" />
        <title>Comparador de Preços telecomunicações</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <!-- Styles -->
        <link href="<?php echo e(asset('css/app.css')); ?>" rel="stylesheet">
    </head>
    <body>
    <div id="index"></div>

    <script src="<?php echo e(asset('js/app.js')); ?>"></script>
    </body>
</html>
<?php /**PATH C:\xampp\htdocs\php\comparadorprecostelecomunicacoes\resources\views/welcome.blade.php ENDPATH**/ ?>