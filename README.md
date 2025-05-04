# hosted_card_vault

[![](https://img.shields.io/badge/PSA-Vault-blue.svg)](https://www.psacard.com/info/psa-vault)
[![](https://img.shields.io/badge/PSA-Grading-red.svg)](https://www.psacard.com/services/tradingcardgrading)
[![](https://img.shields.io/badge/CGC-Grading-black.svg)](https://www.cgccards.com/card-grading/trading-card-grading/)

Just another hosted static site. (But this time to help group and display my very modest foray into the world of **Graded** and **Vaulted** TCG's and CCG's!) 

It's a *personal* site *only* (non-commercial, intended to practice some e-commerce, UI/UX, and basic web dev - basically where I got [my start](https://www.nytimes.com/2016/02/21/jobs/building-a-better-bidding-war.html) before getting into digital banking/finance)!

> *It's like having office desk photos ... of TRADING CARDS!!!*

## Shout Outs and Contact Info

> Specialist thanks to the many outstanding traders, players, customers, card shops, enthusiasts, and trading platforms that made this small collection possible! 

Turns out many find over a period spanning almost a decade(ish) is starting to coalesce into a cool (*Heirloom*? For my future kids if any? Possibly?) collection! Many kudos and my sincerest well wishes to all others embarking on the same journey!

> Please [PM](https://www.thoughtscript.io/about) me for inquests, trades, requests, questions, and the like!

## Contents

A gallery of cards I've collected from a variety of formats and games (and either have graded or will). Including:

* [Doomlings](http://rwrd.io/efma9hn?c) - A fun, symmetric, *Deck-Builder* game.
* [Sorcery: Contested Realm](https://sorcerytcg.com/) - Card *Chess*, awesomely combines classic Trading Card Game play with a 3D field of play (grid, *flying*, *submerging*), I'm a [Kickstarter](https://www.kickstarter.com/) "super"-backer ("adventure capital" lol) and backed this, [League](http://irafay.com/Sorcery/)-play.
* [Altered TCG](https://www.altered.gg/) - Card *Race Track* (be the first to first unite with your pet friend), newly released, (a? the?) first mainstream non-violent Trading Card Game, [Kickstarter](https://www.kickstarter.com/)-backer.
* [Magic the Gathering](https://magic.wizards.com/) - One of the "Big Three". Constructed, [EDH Commander](https://mtgcommander.net/), FNM Promos, PTQ's, DCI, etc.
* [Flesh and Blood](https://fabtcg.com/) - Constructed, like [League of Legends](https://www.leagueoflegends.com/) in card format.
* [Pokémon](https://www.pokemon.com/) - First among the "Big Three". Various and random popular cards.
* [Otherverse](https://otherversetcg.com) - Mostly defunct but interestingly unique artwork and gameplay.
* [MetaZoo](https://cosmicbook.news/metazoo-returns-2025-gameqbator) - Defunct. (But returning!) Animated, tongue-in-cheek, game about famous monsters/cryptids.
* [Nostalgix TCG](https://www.nostalgixtcg.com/) - Mostly defunct, Pokémon challenger game, [Kickstarter](https://www.kickstarter.com/)-backer.
* [Yu-Gi-Oh!](https://www.yugioh-card.com/) - Another of the "Big Three", cool dragons. 
* [One Piece](https://en.onepiece-cardgame.com/) - Recent hit, based on the successful manga, [intriguing backstory](https://onepiece.fandom.com/wiki/Void_Century).

## Benefits of Slabbing and Vaulting

1. Reduced shipping and handling - sell and stash your loot in the same place. Frictionless.
1. Reduced manual handling of your most valuable cards.
1. Risk averse - keep those cards safe from fires, earthquakes, and natural calamities. (Automatically insured too!)
1. Grading assigns a "quality" score that can increase the value of the raw card.
1. The "slab" itself is UV resistant (most "slabs" are acrylic polymers - BPA and PET free) and pretty much the best sleeve/protector you can get today. **They are PVC and acid-free (unlike, as it turns out, many toploaders)!**
1. "Slabs" may potentially see play (IMO) given cool new widgets like: https://gradedguard.com/. I personally despise sleeves (they break, they sometimes have PVC in them, you have to resleeve, etc.)! Broken sleeves add up over time.
1. Most importantly (IMO), you know you're getting a real card. Not a counterfeit.

## Analysis

Definitions:

* *Cost of Grading* = the cost to *Grade* a card through PSA, CGC, etc.
* **Raw Value** = the face-value of an un-*Graded* NM card.
* **Slabbed Value** = recent buying/selling prices for a *Graded* card.
* **Input Cost** = *Cost of Grading* `+` **Raw Value**

Some assumptions, empirical observations, and data points being tested:

1. **Slabbed Value** `>=` **Input Cost**
2. Eventually, the supply of **Raw** cards will diminish to near-`0` populations.
3. **Slabbed Value** is a composite of rarity (artificial, actual, etc.), aesthetics, playability, demand, age, nostalgia, and so on.
4. If people continue to buy up **Raw** cards (reducing **Raw** supply) and have them *Graded* (increasing **Slabbed** supply), **Slabbed Values** will nevertheless continue to increase (since age, playability, and **Raw Value** will continue to determine **Slabbed Value**).
5. The best time to buy cards is within a year after they're released **Raw** (but not immediately after set release). More precisely, the interval `<=` 12 months and `>=` 3 months.
6. The best growth of a card occurs if one holds a card purchased during the above window, has it *Graded* (at an `8` to `10` level) and for about a decade.
7. Cards *Graded* at `8` - `10` will see a premium reflected in their **Slabbed Value**. Cards at `7` shouldn't dip below **Input Cost**.
8. Even cards *Graded* below `8` will often increase to multiples of their **Raw Value** after 10 years.

## Details of Use

This site is programmatically generated using my simple [Card Lookup Helper](https://gitlab.com/Thoughtscript/card_lookup_helper) tool through the command:

```bash
bash run.sh
```

1. Images used on this page are retrieved from the [Official PSA](https://www.psacard.com/cert) and the [Official CGC](https://www.cgccards.com/certlookup/) Certificate Population public registries!
1. Listed vault values are estimates based on time-specific snapshots.