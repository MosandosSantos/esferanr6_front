# Script para corrigir instalação do Node.js no Windows
# Resolve problemas de arquivos bloqueados (EBUSY)

Write-Host "=== Iniciando limpeza e reinstalação ===" -ForegroundColor Cyan

# Passo 1: Parar processos que podem bloquear arquivos
Write-Host "`n[1/6] Finalizando processos Node.js e NPM..." -ForegroundColor Yellow
Get-Process -Name node,npm -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Passo 2: Remover node_modules existente
Write-Host "[2/6] Removendo node_modules antigo..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

# Passo 3: Remover package-lock.json
Write-Host "[3/6] Removendo package-lock.json..." -ForegroundColor Yellow
if (Test-Path "package-lock.json") {
    Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
}

# Passo 4: Limpar cache do npm
Write-Host "[4/6] Limpando cache do NPM..." -ForegroundColor Yellow
npm cache clean --force 2>&1 | Out-Null

# Passo 5: Aguardar liberação de recursos
Write-Host "[5/6] Aguardando liberação de recursos do sistema..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Passo 6: Reinstalar dependências
Write-Host "[6/6] Instalando dependências..." -ForegroundColor Yellow
Write-Host "   Isso pode levar alguns minutos..." -ForegroundColor Gray

# Tentar instalação com retry
$maxRetries = 3
$retryCount = 0
$success = $false

while ((-not $success) -and ($retryCount -lt $maxRetries)) {
    $retryCount++
    Write-Host "`n   Tentativa $retryCount de $maxRetries..." -ForegroundColor Gray

    # Executar npm install
    $process = Start-Process -FilePath "npm" -ArgumentList "install","--no-audit","--no-fund","--prefer-offline" -NoNewWindow -PassThru -Wait

    if ($process.ExitCode -eq 0) {
        $success = $true
        Write-Host "`n=== Instalação concluída com sucesso! ===" -ForegroundColor Green
    } else {
        Write-Host "   Falhou. Aguardando antes de tentar novamente..." -ForegroundColor Red
        Start-Sleep -Seconds 5

        # Limpar resíduos antes de tentar novamente
        if (Test-Path "node_modules") {
            Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
        }
    }
}

if (-not $success) {
    Write-Host "`n=== ERRO: Não foi possível completar a instalação após $maxRetries tentativas ===" -ForegroundColor Red
    Write-Host "Sugestões:" -ForegroundColor Yellow
    Write-Host "  1. Desabilite temporariamente o antivírus" -ForegroundColor White
    Write-Host "  2. Execute este script como Administrador" -ForegroundColor White
    Write-Host "  3. Feche todos os editores de código e terminais" -ForegroundColor White
    exit 1
}

# Verificar se o Next.js foi instalado
Write-Host "`n=== Verificando instalação do Next.js ===" -ForegroundColor Cyan
if (Test-Path "node_modules\.bin\next.cmd") {
    Write-Host "Next.js instalado com sucesso!" -ForegroundColor Green
    Write-Host "`nVocê pode agora executar:" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor White
} else {
    Write-Host "AVISO: Binário do Next.js não encontrado!" -ForegroundColor Red
}
