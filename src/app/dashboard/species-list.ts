export type SpeciesEntry = {
  commonName: string
  scientificName: string
}

export const FRESHWATER_FISH_SPECIES: SpeciesEntry[] = [
  // Salmonidae
  {commonName: "臺灣櫻花鉤吻鮭", scientificName: "Oncorhynchus masou formosanus"},

  // Cyprinidae / Leuciscidae
  {commonName: "飯島氏銀鮈", scientificName: "Squalidus iijimae"},
  {commonName: "大眼銀鮈", scientificName: "Squalidus argentatus"},
  {commonName: "巴氏銀鮈", scientificName: "Squalidus banarescui"},

  {commonName: "高身小鰾鮈", scientificName: "Microphysogobio alticorpus"},
  {commonName: "短吻小鰾鮈", scientificName: "Microphysogobio brevirostris"},

  {commonName: "菊池氏細鯽", scientificName: "Aphyocypris kikuchii"},
  {commonName: "溪流細鯽", scientificName: "Aphyocypris amnis"},

  {commonName: "臺灣副細鯽", scientificName: "Pararasbora moltrechti"},

  {commonName: "臺灣梅氏鯿", scientificName: "Metzia formosae"},
  {commonName: "大鱗梅氏鯿", scientificName: "Metzia mesembrinum"},

  {commonName: "大眼華鯿", scientificName: "Sinibrama macrops"},

  {commonName: "臺灣石鮒", scientificName: "Tanakia himantegus"},
  {commonName: "黃鰭石鮒", scientificName: "Paratanakia fulvidorsalis"},
  {commonName: "高體鰟鮍", scientificName: "Rhodeus ocellatus"},

  {commonName: "條紋小䰾", scientificName: "Puntius semifasciolatus"},
  {commonName: "史尼氏小䰾", scientificName: "Puntius snyderi"},

  {commonName: "高屏馬口鱲", scientificName: "Opsariichthys kaopingensis"},
  {commonName: "長鰭鱲", scientificName: "Opsariichthys evolans"},
  {commonName: "粗首鱲", scientificName: "Opsariichthys pachycephalus"},
  {commonName: "臺灣鬚鱲", scientificName: "Candidia barbata"},
  {commonName: "屏東鬚鱲", scientificName: "Candidia pingtungensis"},

  {commonName: "臺灣石賓", scientificName: "Acrossocheilus paradoxus"},
  {commonName: "高身白甲魚", scientificName: "Onychostoma alticorpus"},
  {commonName: "臺灣白甲魚", scientificName: "Onychostoma barbatulum"},

  {commonName: "唇䱻", scientificName: "Hemibarbus labeo"},

  {commonName: "圓吻鯝", scientificName: "Distoechodon tumirostris"},

  {commonName: "何氏棘䰾", scientificName: "Spinibarbus hollandi"},

  {commonName: "鯉魚", scientificName: "Cyprinus carpio"},
  {commonName: "鯽魚", scientificName: "Carassius auratus"},

  {commonName: "紅鰭鮊", scientificName: "Chanodichthys erythropterus"},
  {commonName: "翹嘴鮊", scientificName: "Culter alburnus"},
  {commonName: "鰱", scientificName: "Hypophthalmichthys molitrix"},
  {commonName: "草魚", scientificName: "Ctenopharyngodon idella"},

  // Cobitidae
  {commonName: "中華鰍", scientificName: "Cobitis sinensis"},
  {commonName: "泥鰍", scientificName: "Misgurnus anguillicaudatus"},
  {commonName: "大鱗副泥鰍", scientificName: "Paramisgurnus dabryanus"},

  // Bagridae
  {commonName: "長脂瘋鱨", scientificName: "Tachysurus adiposalis"},
  {commonName: "短臀瘋鱨", scientificName: "Tachysurus brevianalis"},
  {commonName: "龍鮠", scientificName: "Tachysurus flumendraco"},

  // Siluridae
  {commonName: "鯰", scientificName: "Silurus asotus"},

  // Adrianichthyidae
  {commonName: "青鱂", scientificName: "Oryzias latipes"},
  {commonName: "成龍青鱂", scientificName: "Oryzias chenglongensis"},
  {commonName: "噶瑪蘭青鱂", scientificName: "Oryzias cabaranensis"},

  // Channidae
  {commonName: "七星鱧", scientificName: "Channa asiatica"},
  {commonName: "斑鱧", scientificName: "Channa maculata"},

  // Osphronemidae
  {commonName: "蓋斑鬥魚", scientificName: "Macropodus opercularis"},

  // Synbranchidae
  {commonName: "黃鱔", scientificName: "Monopterus albus"},

  // Formosania
  {commonName: "纓口臺鰍", scientificName: "Formosania lacustre"},
  {commonName: "吉氏纓口鰍", scientificName: "Formosania gilberti"},

  // Gastromyzontidae / river loaches
  {commonName: "臺灣間爬岩鰍", scientificName: "Hemimyzon formosanus"},
  {commonName: "臺東間爬岩鰍", scientificName: "Hemimyzon taitungensis"},
  {commonName: "南臺中華爬岩鰍", scientificName: "Sinogastromyzon nantaiensis"},
  {commonName: "埔里中華爬岩鰍", scientificName: "Sinogastromyzon puliensis"},

  // Rhyacichthyidae
  {commonName: "溪鱧", scientificName: "Rhyacichthys aspro"},

  // Gobiidae
  {commonName: "大吻鰕虎", scientificName: "Rhinogobius gigas"},
  {commonName: "極樂吻鰕虎", scientificName: "Rhinogobius giurinus"},
  {commonName: "明潭吻鰕虎", scientificName: "Rhinogobius candidianus"},
  {commonName: "臺灣吻鰕虎", scientificName: "Rhinogobius formosanus"},
  {commonName: "陽明山吻鰕虎", scientificName: "Rhinogobius yangminshanensis"},
  {commonName: "南臺吻鰕虎", scientificName: "Rhinogobius nantaiensis"},
  {commonName: "恆春吻鰕虎", scientificName: "Rhinogobius henchuenensis"},
  {commonName: "蘭嶼吻鰕虎", scientificName: "Rhinogobius lanyuensis"},
  {commonName: "細斑吻鰕虎", scientificName: "Rhinogobius delicatus"},
  {commonName: "斑帶吻鰕虎", scientificName: "Rhinogobius maculafasciatus"},
  {commonName: "短吻紅斑吻鰕虎", scientificName: "Rhinogobius rubromaculatus"},
  {commonName: "巴布拉吻鰕虎", scientificName: "Rhinogobius baborinisanensis"},

  {commonName: "黑頭阿胡鰕虎", scientificName: "Awaous melanocephalus"},

  {commonName: "刺蓋塘鱧", scientificName: "Eleotris acanthopoma"},
  {commonName: "褐塘鱧", scientificName: "Eleotris fusca"},

  {commonName: "盤鰭叉舌鰕虎", scientificName: "Glossogobius celebius"},

  {commonName: "阿部氏鯔鰕虎", scientificName: "Mugilogobius abei"},
  {commonName: "黏皮鯔鰕虎", scientificName: "Mugilogobius myxodermus"},

  {commonName: "寬帶裂身鰕虎", scientificName: "Schismatogobius ampluvinculus"},
  {commonName: "羅氏裂身鰕虎", scientificName: "Schismatogobius roxasi"},

  {commonName: "環帶瓢眼鰕虎", scientificName: "Sicyopus zosterophorus"},
  {commonName: "日本瓢鰭鰕虎", scientificName: "Sicyopterus japonicus"},
  {commonName: "兔頭瓢鰭鰕虎", scientificName: "Sicyopterus lagocephalus"},
  {commonName: "寬頰瓢鰭鰕虎", scientificName: "Sicyopterus macrostetholepis"},

  {commonName: "黑紫枝牙鰕虎", scientificName: "Stiphodon atropurpureus"},
  {commonName: "美麗枝牙鰕虎", scientificName: "Stiphodon elegans"},
  {commonName: "黑鰭枝牙鰕虎", scientificName: "Stiphodon percnopterygionus"},

  {commonName: "棘鱗裂唇鰕虎", scientificName: "Lentipes armatus"},

  // Anguillidae
  {commonName: "日本鰻", scientificName: "Anguilla japonica"},
  {commonName: "鱸鰻", scientificName: "Anguilla marmorata"},
  {commonName: "二色鰻", scientificName: "Anguilla bicolor pacifica"},
  {commonName: "西里伯斯鰻", scientificName: "Anguilla celebesensis"},
  {commonName: "呂宋鰻", scientificName: "Anguilla luzonensis"},

  // Plecoglossidae
  {commonName: "香魚", scientificName: "Plecoglossus altivelis"},

  // Other freshwater / diadromous species
  {commonName: "溪哥", scientificName: "Zacco pachycephalus"},

  // Pseudorasbora
  {commonName: "羅漢魚", scientificName: "Pseudorasbora parva"}
]
