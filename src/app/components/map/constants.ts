// iNaturalist API doc: https://api.inaturalist.org/v1/docs/

// place_id=7887 - taiwan
// iconic_taxa=Actinopterygii - fish
// https://api.inaturalist.org/v1/taxa?q=Actinopterygii => id: 47178
// const searchURL = "https://api.inaturalist.org/v1/observations?place_id=7887&view=species&iconic_taxa=Actinopterygii&locale=zh-TW&verifiable=true&order_by=id&order=desc"
export const iNatURL =
  "https://api.inaturalist.org/v2/observations/species_counts?verifiable=true&spam=false&place_id=7887&iconic_taxa%5B%5D=Actinopterygii&locale=zh-TW&include_ancestors=true&fields=(taxon%3A(ancestor_ids%3A!t%2Cancestors%3A(default_photo%3A(square_url%3A!t)%2Ciconic_taxon_name%3A!t%2Cid%3A!t%2Cis_active%3A!t%2Cname%3A!t%2Cpreferred_common_name%3A!t%2Cpreferred_common_names%3A(name%3A!t)%2Crank%3A!t%2Crank_level%3A!t%2Cuuid%3A!t)%2Cancestry%3A!t%2Cconservation_status%3A(status%3A!t)%2Cdefault_photo%3A(attribution%3A!t%2Clicense_code%3A!t%2Cmedium_url%3A!t%2Csquare_url%3A!t%2Curl%3A!t)%2Cestablishment_means%3A(establishment_means%3A!t)%2Ciconic_taxon_name%3A!t%2Cid%3A!t%2Cis_active%3A!t%2Cname%3A!t%2Cpreferred_common_name%3A!t%2Cpreferred_common_names%3A(name%3A!t)%2Crank%3A!t%2Crank_level%3A!t))"
export const taxanomyURLPrefix = "https://www.inaturalist.org/taxa"
// const speciesSearchExample = "https://api.inaturalist.org/v1/observations/species_counts?nelat=...&nelng=...&swlat=...&swlng=...&taxon_id=47178"

export const taxaOnlyURL = "https://api.inaturalist.org/v1/taxa?place_id=7887&taxon_id=47178&rank=species&per_page=100"

export const DEFAULT_ZOOM = 8
export const TAIPEI_CENTER = [25.038357847174, 121.54770626982]
export const TAIWAN_CENTER = [23.973837, 120.97969]
export const MAX_SELECTION = 5

// TODO: integrate GBIF
/*
<TileLayer
  attribution='<a href="https://www.gbif.org">GBIF</a>'
  url="https://api.gbif.org/v2/map/occurrence/density/{z}/{x}/{y}@1x.png?style=classic.point&srs=EPSG%3A3857&taxonKey=1"
/>
*/

export const g0vToken = "pk.eyJ1IjoianMwMDE5MyIsImEiOiJjazN0dnN2aDkwNmwxM21vM2lvNDB4ZzJkIn0.48gtpsBsdD2vLWDVe1dOlQ"
export const defaultTileAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

export const PER_PAGE = 50
export const OBSERVATIONS_PER_PAGE = 100
export const HUES = [0, 30, 60, 120, 180, 240, 300]
