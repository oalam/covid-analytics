#!/usr/bin/env python3
#-*- coding: utf-8 -*-
import pandas
import math

sex_factors = {
    'f': 0.45,
    'h': 0.55
}

age_factors = {
    '0': 0,
    '9': 0,
    '19': 0,
    '29': 2,
    '39': 6,
    '49': 7,
    '59': 24,
    '69': 83,
    '79': 182,
    '89': 0,
    '90': 0
}


# Efficacité vis-à-vis des décès
astrazemeca_efficacity = {
    '0': math.nan,
    '9': math.nan,
    '19': 0.76,
    '29': 0.76,
    '39': 0.76,
    '49': 0.76,
    '59': 0.76,
    '69': 0.76,
    '79': 0.76,
    '89': 0.76,
    '90': 0.76
}

# TTS sous notification EMA 2 doses + anaphylaxie)
astrazemeca_risk = {
    '0': math.nan,
    '9': math.nan,
    '19': math.nan,
    '29': 5.8,
    '39': 4.6,
    '49': 5.8,
    '59': 3.2,
    '69': 3,
    '79': 2.2,
    '89': 1.2,
    '90': math.nan
}

incidence_boost = {
    'high': 1.5,
    'medium': 1,
    'low': 0.5
}

comorbidities_factors = {
    'Aucun': 1,
    'Obésité': 1.63,
    'Diabète': 1.64,
    'Insuffisance cardiaque': 1.44,
    'AVC': 1.33,
    'Maladies respiratoires chroniques': 1.56,
    'Mucoviscidose': 3.74,
    'Embolie pulmonaire': 1.44,
    'Cancers actifs': 1.5,
    'Cancer du poumon actif': 2.6,
    'Polyarthrite rhumatoïde': 1.48,
    'Trisomie 21': 7.03,
    'Recours aux neuroleptiques':1.61,
    'Epilepsie': 1.52,
    'Sclerose en plaque': 1.74,
    'Paraplégie': 1.95,
    'Myopathie': 1.37,
    'Parkinson': 1.52,
    'Démence': 2.04,
    'Retard mental': 3.83,
    'Hémophilie': 1.47,
    'VIH': 1.88,
    'Maladies du foie': 1.5,
    'Insuffisance rénale chronique terminale': 4.16,
    'Transplantation rénale': 4.55,
    'Transplantation cardiaque': 2.15,
    'Transplantation du poumon': 3.53
}




'''
Le taux d'incidence correspond au nombre de tests positifs pour 100.000 habitants. Il est calculé de la manière suivante :
(100000 * nombre de cas positif) / Population

Les classes d’âge :
• 0 tous âges
• 09 0-9 ans
• 19 10-19 ans
• 29 20-29 ans
• 39 30-39 ans
• 49 40-49 ans
• 59 50-59 ans
• 69 60-69 ans
• 79 70- 79 ans
• 89 80-89 ans
• 90 90 ans et plus

source : https://www.data.gouv.fr/fr/datasets/taux-dincidence-de-lepidemie-de-covid-19/
'''



