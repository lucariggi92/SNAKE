# SNAKE

Il classico gioco del serpente, riprodotto con HTML5 Canvas, CSS e JavaScript puro.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## Gioca ora

Apri il file `snake.html` nel tuo browser e gioca!

## Come si gioca

| Tasto | Azione |
|-------|--------|
| `←` `↑` `→` `↓` | Muovi il serpente |
| `Qualsiasi tasto` | Ricomincia dopo Game Over |

**Regole semplici:**
- Mangia i frutti rossi per crescere e fare punti
- Più mangi, più il serpente diventa veloce
- Se tocchi un muro o la tua stessa coda, game over!
- I frutti appaiono sempre in posizioni raggiungibili

## Funzionalità

- Griglia 20x20 con rendering pixel-perfect
- Stile retro anni '90: sfondo nero, serpente verde neon, frutto rosso
- Difficoltà crescente: la velocità aumenta con il punteggio
- Il frutto non genera mai sul serpente
- Prevenzione dell'inversione a 180°
- Schermata di game over con punteggio finale

## Struttura del progetto

```
snake.html          → Pagina principale
snake-style.css     → Stili e design retro
snake-script.js     → Tutta la logica di gioco
docs/               → Documentazione e piani di sviluppo
```

## Dettagli tecnici

| Parametro | Valore |
|-----------|--------|
| Griglia | 20x20 celle |
| Dimensione cella | 20px |
| Canvas | 400x400 pixel |
| Velocità iniziale | 150ms per tick |
| Aumento velocità | -5ms per frutto mangiato |
| Velocità massima | 50ms per tick |

## Come è stato realizzato

Questo progetto è stato sviluppato con **OpenCode**, un assistente di coding basato su IA.

Il processo ha seguito un approccio strutturato chiamato **Subagent-Driven Development**:

1. **Brainstorming** — Ho descritto le regole del gioco, OpenCode ha fatto domande per chiarire i dettagli (dimensione griglia, stile visivo, velocità)
2. **Design** — Abbiamo deciso insieme l'architettura: Canvas per il rendering, stile retro, 3 file separati
3. **Piano di implementazione** — Il lavoro è stato spezzato in 9 task piccoli e indipendenti
4. **Esecuzione** — Ogni task è stato eseguito da un agente AI isolato, con revisione automatica

### Perché questo approccio?

- Ogni agente lavora con contesto fresco (nessuna confusione tra task)
- Ogni task produce un risultato testabile e verificabile
- Il codice viene scritto e verificato prima di passare al passo successivo

## Documentazione

Trovate gli spec completi in:
- `docs/superpowers/specs/` — Design del gioco
- `docs/superpowers/plans/` — Piano di implementazione

## Licenza

Progetto open source disponibile sotto licenza MIT.
