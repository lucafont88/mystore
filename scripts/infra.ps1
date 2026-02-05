param (
    [Parameter(Mandatory=$true)]
    [ValidateSet("up", "down", "status", "logs")]
    $Action
)

switch ($Action) {
    "up" {
        docker-compose up -d
    }
    "down" {
        docker-compose down
    }
    "status" {
        docker-compose ps
    }
    "logs" {
        docker-compose logs -f
    }
}
