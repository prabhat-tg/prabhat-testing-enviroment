'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import TG_Banner from '@/src/components/shared/bannners/Banner';
import Tooltip from '@/src/features/tyreComponents/commonComponents/Tooltip';

const ImplementDetailsSpecs = ({ implementDetail, translation, currentLang, bannerDetail }) => {
    const currentDate = new Date()
        .toLocaleDateString('en-GB', {
            month: 'short',
            year: 'numeric',
            day: 'numeric',
        })
        .replace(/,/g, '');
    // State for the specs section - initially open
    const [isOpen, setIsOpen] = useState(true);

    // Function to get tooltip content for each specification
    const getTooltipContent = label => {
        const brandModel = `${implementDetail.brand_name} ${implementDetail.model_name}`;
        const lowerLabel = label.toLowerCase().trim();

        // Helper function to check if label contains patterns in both English and Hindi
        const containsPattern = (patterns) => {
            return patterns.some(pattern => lowerLabel.includes(pattern));
        };

        // Helper function to replace placeholders in translation strings
        const formatTooltip = (template, fallback) => {
            if (template) {
                return template
                    .replace(/\{brand\}/g, implementDetail.brand_name)
                    .replace(/\{model\}/g, implementDetail.model_name)
                    .replace(/\{brandModel\}/g, brandModel);
            }
            return fallback
                .replace(/\{brand\}/g, implementDetail.brand_name)
                .replace(/\{model\}/g, implementDetail.model_name)
                .replace(/\{brandModel\}/g, brandModel);
        };

        // Pattern-based tooltip matching system with English and Hindi support
        // Basic information patterns
        if (containsPattern(['brand', 'ब्रांड', 'ब्रान्ड'])) {
            return formatTooltip(
                translation?.implementSpecs?.tooltips?.brand,
                'Manufacturer brand - {brand}'
            );
        }

        if (containsPattern(['model', 'मॉडल', 'मोडल'])) {
            return formatTooltip(
                translation?.implementSpecs?.tooltips?.model,
                'Specific model name - {model}'
            );
        }

        if (containsPattern(['category', 'श्रेणी', 'कैटेगरी'])) {
            return formatTooltip(
                translation?.implementSpecs?.tooltips?.category,
                'Category classification of {brandModel}'
            );
        }

        if (containsPattern(['type', 'प्रकार', 'टाइप']) &&
            !containsPattern(['blade', 'ब्लेड']) &&
            !containsPattern(['disc', 'डिस्क']) &&
            !containsPattern(['engine', 'इंजन'])) {
            return formatTooltip(
                translation?.implementSpecs?.tooltips?.type,
                'Type classification of {brandModel}'
            );
        }

        // Engine and power specifications
        if (containsPattern(['power', 'शक्ति', 'पावर', 'hp', 'एचपी'])) {
            if (containsPattern(['tractor', 'ट्रैक्टर'])) {
                return translation?.implementDetails?.specTooltips?.tractorHp || 'Power of the tractor to pull the implement';
            } else if (containsPattern(['engine', 'इंजन'])) {
                return 'Power output of the engine';
            } else if (containsPattern(['implement', 'उपकरण', 'यंत्र'])) {
                return translation?.implementDetails?.specTooltips?.implementPower || 'Implement work with this HP range tractor';
            } else {
                return translation?.implementDetails?.specTooltips?.implementPower || 'Implement work with this HP range tractor';
            }
        }

        if (containsPattern(['engine', 'इंजन'])) {
            if (containsPattern(['type', 'प्रकार', 'name', 'नाम'])) {
                return 'Type of engine used in implement';
            } else if (containsPattern(['output', 'आउटपुट', 'revolution', 'क्रांति'])) {
                return 'Power delivered by the engine for operation';
            } else {
                return 'Engine specification of implement';
            }
        }

        // Dimensions and measurements
        if (containsPattern(['length', 'लंबाई', 'लम्बाई'])) {
            if (containsPattern(['drum', 'ड्रम'])) {
                return 'Drum\'s total length for processing';
            } else if (containsPattern(['boom', 'बूम'])) {
                return 'Length of sprayer boom';
            } else if (containsPattern(['bar', 'बार', 'छड़'])) {
                return 'Length of implement\'s bar';
            } else {
                return translation?.implementDetails?.specTooltips?.length || 'Length of implement';
            }
        }

        if (containsPattern(['height', 'ऊंचाई', 'ऊँचाई'])) {
            if (containsPattern(['cutting', 'कटाई', 'कटिंग'])) {
                return 'Adjustable height for cutting';
            } else if (containsPattern(['loading', 'लोडिंग'])) {
                return 'Height at which materials can be loaded';
            } else if (containsPattern(['dump', 'डंप'])) {
                return 'Height at which materials are dumped';
            } else if (containsPattern(['seedling', 'पौधा', 'बीज'])) {
                return 'Height of seedlings ready for transplanting';
            } else {
                return translation?.implementDetails?.specTooltips?.height || 'Height of implement';
            }
        }

        if (containsPattern(['width', 'चौड़ाई', 'चौड़ाइ'])) {
            if (containsPattern(['working', 'कार्यशील', 'कार्य'])) {
                return translation?.implementDetails?.specTooltips?.workingWidth || 'Working width of the implement';
            } else if (containsPattern(['tillage', 'tilling', 'जुताई', 'जोत'])) {
                return 'Width of soil tilled';
            } else if (containsPattern(['cut', 'कट', 'कटाई'])) {
                return translation?.implementDetails?.specTooltips?.widthOfCut || 'Width of soil cut in one pass';
            } else if (containsPattern(['effective', 'प्रभावी'])) {
                return 'Width of straw cut in one pass';
            } else if (containsPattern(['total', 'कुल', 'संपूर्ण'])) {
                return translation?.implementDetails?.specTooltips?.width || 'Total width of the implement';
            } else if (containsPattern(['cutter', 'कटर', 'bar', 'बार'])) {
                return 'Width of the cutting mechanism';
            } else {
                return translation?.implementDetails?.specTooltips?.width || 'Width of implement';
            }
        }

        if (containsPattern(['weight', 'वजन', 'भार'])) {
            if (containsPattern(['crumble', 'क्रम्बल'])) {
                return 'Additional weight on implements while working on soil';
            } else if (containsPattern(['without', 'बिना', 'empty', 'खाली'])) {
                return 'Weight without any load';
            } else {
                return translation?.implementDetails?.specTooltips?.weight || 'Weight of implement';
            }
        }

        // Depth specifications
        if (containsPattern(['depth', 'गहराई', 'गहरी'])) {
            if (containsPattern(['cut', 'कट', 'कटाई'])) {
                return 'Maximum cutting depth capability';
            } else if (containsPattern(['till', 'जुताई', 'जोत'])) {
                return 'Depth of soil tilled';
            } else if (containsPattern(['drill', 'ड्रिल', 'खुदाई'])) {
                return 'Depth of soil drilled';
            } else if (containsPattern(['plant', 'रोपण', 'बुवाई'])) {
                return 'Depth at which seedlings are planted';
            } else if (containsPattern(['dig', 'खुदाई', 'खोदना'])) {
                return 'Depth the machine can dig into the ground';
            } else {
                return 'Working depth specification';
            }
        }

        // Capacity specifications
        if (containsPattern(['capacity', 'क्षमता', 'कैपेसिटी'])) {
            if (containsPattern(['tank', 'टैंक', 'टंकी'])) {
                return 'Volume of liquid that tank can hold';
            } else if (containsPattern(['fuel', 'ईंधन', 'फ्यूल'])) {
                return 'Maximum fuel the tank can hold';
            } else if (containsPattern(['seed', 'बीज', 'box', 'बॉक्स'])) {
                return 'Maximum seeds held by the seed box';
            } else if (containsPattern(['fertilizer', 'खाद', 'उर्वरक'])) {
                return 'Maximum fertilizer stored';
            } else if (containsPattern(['grain', 'अनाज', 'दाना'])) {
                return 'Maximum grain storage in tank';
            } else if (containsPattern(['hopper', 'होपर', 'bunker', 'बंकर'])) {
                return 'Seed-holding capacity of the container';
            } else if (containsPattern(['hydraulic', 'हाइड्रोलिक'])) {
                return 'Lifting power of hydraulic system';
            } else if (containsPattern(['loader', 'लोडर'])) {
                return 'Maximum weight the loader can lift';
            } else if (containsPattern(['backhoe', 'बैकहो'])) {
                return 'Backhoe working capacity';
            } else if (containsPattern(['twine', 'रस्सी', 'binding', 'बांधना'])) {
                return 'Capacity of twine for bale binding';
            } else {
                return translation?.implementDetails?.specTooltips?.capacity || 'Working capacity of the implement';
            }
        }

        // Blade specifications
        if (containsPattern(['blade', 'ब्लेड', 'फाल'])) {
            if (containsPattern(['reversible', 'पलटने', 'उल्टी'])) {
                if (containsPattern(['side', 'साइड', 'बगल'])) {
                    return translation?.implementDetails?.specTooltips?.reversibleSideBlade || 'Side blade that can be flipped';
                } else {
                    return translation?.implementDetails?.specTooltips?.reversibleMainBlade || 'Main blade that can be flipped';
                }
            } else if (containsPattern(['cutting', 'कटिंग', 'कटाई', 'thickness', 'मोटाई'])) {
                return translation?.implementDetails?.specTooltips?.cuttingBladeThickness || 'Thickness of blade';
            } else if (containsPattern(['scraping', 'खुरचना', 'स्क्रैपिंग'])) {
                return translation?.implementDetails?.specTooltips?.scrapingBlade || 'Blade used to scrape the soil evenly';
            } else if (containsPattern(['number', 'संख्या', 'no ', 'नंबर'])) {
                return 'Total number of blades in implement';
            } else if (containsPattern(['type', 'प्रकार', 'टाइप'])) {
                return 'Blade design for soil cutting and mixing';
            } else if (containsPattern(['chopping', 'चॉपिंग', 'कटाई'])) {
                return 'Total number of chopping blades';
            } else if (containsPattern(['serrated', 'दांतेदार', 'सेरेटेड'])) {
                return 'Total number of serrated blade used';
            } else {
                return translation?.implementDetails?.specTooltips?.scrapingBlade || 'Blade used to scrape the soil evenly';
            }
        }

        // Disc specifications
        if (containsPattern(['disc', 'डिस्क', 'चक्र'])) {
            if (containsPattern(['diameter', 'व्यास', 'डायामीटर'])) {
                return 'Diameter of discs for soil working';
            } else if (containsPattern(['spacing', 'अंतर', 'दूरी', 'distance'])) {
                return 'Spacing between discs for coverage';
            } else if (containsPattern(['number', 'संख्या', 'no ', 'नंबर'])) {
                return 'Total number of discs in implement';
            } else if (containsPattern(['type', 'प्रकार', 'टाइप'])) {
                return 'Shape and design of discs used';
            } else {
                return 'Disc specification for soil working';
            }
        }

        // Tyre and wheel specifications
        if (containsPattern(['tyre', 'tire', 'टायर', 'टाइर', 'wheel', 'पहिया', 'पहिये'])) {
            if (containsPattern(['size', 'साइज', 'आकार'])) {
                if (containsPattern(['front', 'आगे', 'सामने'])) {
                    return 'Size of front tyre';
                } else if (containsPattern(['rear', 'पीछे', 'रियर'])) {
                    return 'Size of rear tyre';
                } else {
                    return translation?.implementDetails?.specTooltips?.tyreSize || 'Size of tyre';
                }
            } else if (containsPattern(['axle', 'धुरा', 'एक्सल'])) {
                return translation?.implementDetails?.specTooltips?.tyreAxle || 'Supports the tyres and gives stability';
            } else if (containsPattern(['adjustment', 'समायोजन', 'एडजस्टमेंट'])) {
                return 'Flexibility to adjust wheel positions';
            } else if (containsPattern(['gauge', 'गेज'])) {
                return 'Wheels to stabilize pick-up height';
            } else {
                return translation?.implementDetails?.specTooltips?.tyreSize || 'Size of tyre';
            }
        }

        // Axle specifications
        if (lowerLabel.includes('axle')) {
            if (lowerLabel.includes('type')) {
                return 'Type of axle system for load distribution';
            } else if (lowerLabel.includes('front')) {
                return 'The front axle of the machine';
            } else if (lowerLabel.includes('rear')) {
                return 'The rear axle of the machine';
            } else if (lowerLabel.includes('bearing')) {
                return 'Bearing enabling axle rotation smoothly';
            } else {
                return 'Shaft connecting the wheels';
            }
        }

        // Connection and attachment specifications
        if (containsPattern(['drawbar', 'ड्रॉबार', 'छड़'])) {
            if (containsPattern(['type', 'प्रकार', 'टाइप'])) {
                return 'Connection type for attaching to tractor';
            } else if (containsPattern(['lifting', 'उठाना', 'लिफ्टिंग'])) {
                return 'Lifting mechanism of the drawbar';
            } else {
                return translation?.implementDetails?.specTooltips?.drawbar || 'A bar used to connect the implement to the tractor';
            }
        }

        if (containsPattern(['linkage', 'लिंकेज', 'hitch', 'हिच'])) {
            if (containsPattern(['3', 'three', 'तीन', '३'])) {
                return 'Used to connect the implements to the tractor';
            } else if (containsPattern(['lower', 'निचला', 'लोअर'])) {
                return 'Tractor linkage type for attachment';
            } else if (containsPattern(['ring', 'रिंग', 'छल्ला'])) {
                return 'Size of the hitch for tractor attachment';
            } else {
                return 'Used to connect the implements to the tractor';
            }
        }

        if (containsPattern(['hydraulic', 'हाइड्रोलिक', 'हाइड्रालिक'])) {
            if (containsPattern(['cylinder', 'सिलेंडर', 'सिलिंडर'])) {
                return translation?.implementDetails?.specTooltips?.hydraulicCylinder || 'Used to lift and adjust the implement height';
            } else if (containsPattern(['capacity', 'क्षमता', 'कैपेसिटी'])) {
                return 'Hydraulic lifting capacity required for operation';
            } else {
                return 'Hydraulic system specification';
            }
        }

        // System specifications
        if (lowerLabel.includes('system')) {
            if (lowerLabel.includes('cool')) {
                return 'Maintains engine temperature during operation';
            } else if (lowerLabel.includes('thresh')) {
                return 'Mechanism to separate grains from crops';
            } else if (lowerLabel.includes('ignition')) {
                return 'Method for starting the engine';
            } else if (lowerLabel.includes('start')) {
                return 'Mechanism used for starting the machine';
            } else if (lowerLabel.includes('separation')) {
                return 'Method to separate grains from straw';
            } else if (lowerLabel.includes('transmission')) {
                return 'Mechanism for power transfer in machine';
            } else {
                return 'System specification of implement';
            }
        }

        // Transmission and gear specifications
        if (lowerLabel.includes('transmission')) {
            if (lowerLabel.includes('side')) {
                return 'Power transferred via side mechanisms';
            } else if (lowerLabel.includes('type')) {
                return 'Mechanism for power transfer in machine';
            } else {
                return 'Power delivery system from tractor to implement';
            }
        }

        if (lowerLabel.includes('gear')) {
            if (lowerLabel.includes('box')) {
                if (lowerLabel.includes('overload')) {
                    return 'Prevents damage during overload situations';
                } else {
                    return 'Mechanism to control power and speed';
                }
            } else if (lowerLabel.includes('number') || lowerLabel.includes('no ')) {
                return 'Number of forward and reverse speed options';
            } else {
                return 'Gear specification of implement';
            }
        }

        if (lowerLabel.includes('clutch')) {
            return 'Mechanism to control power transmission';
        }

        // Speed and RPM specifications
        if (containsPattern(['speed', 'गति', 'स्पीड'])) {
            if (containsPattern(['max', 'maximum', 'अधिकतम', 'मैक्स'])) {
                if (containsPattern(['forward', 'आगे', 'फॉरवर्ड'])) {
                    return 'Highest speed when moving forward';
                } else if (containsPattern(['reverse', 'रिवर्स', 'पीछे'])) {
                    return 'Maximum speed when moving reverse';
                } else {
                    return 'Maximum speed specification';
                }
            } else if (containsPattern(['forward', 'आगे', 'फॉरवर्ड'])) {
                return 'Highest speed when moving forward';
            } else if (containsPattern(['reverse', 'रिवर्स', 'पीछे'])) {
                return 'Maximum speed when moving reverse';
            } else {
                return 'Speed at which the machine operates';
            }
        }

        if (containsPattern(['rpm', 'आरपीएम', 'चक्र'])) {
            if (containsPattern(['pto', 'पीटीओ'])) {
                return 'Power Take-Off speed for operation';
            } else if (containsPattern(['thresh', 'थ्रेश', 'गहाई'])) {
                return 'Thresher blade rotation per minute';
            } else if (containsPattern(['input', 'इनपुट'])) {
                return 'Power-take-off speed for operation';
            } else {
                return 'Revolution per minute specification';
            }
        }

        // Specific implement features
        if (containsPattern(['furrow', 'फरो', 'नाली'])) {
            return 'Groove created in soil by the plough';
        }

        if (containsPattern(['bodies', 'बॉडी', 'शरीर']) && containsPattern(['number', 'संख्या', 'नंबर'])) {
            return 'Number of plough bodies for coverage';
        }

        if (containsPattern(['tyne', 'टाइन', 'कांटा'])) {
            if (containsPattern(['number', 'संख्या', 'no ', 'नंबर'])) {
                return 'Total number of tynes used';
            } else if (containsPattern(['rows', 'पंक्ति', 'रो'])) {
                return 'Number of tines rows for material pick-up';
            } else if (containsPattern(['types', 'प्रकार', 'टाइप'])) {
                return 'Types of tines for digging soil';
            } else {
                return 'Tyne for soil penetration and cultivation';
            }
        }

        // Sprayer specifications
        if (lowerLabel.includes('nozzle') || lowerLabel.includes('nossel')) {
            if (lowerLabel.includes('number') || lowerLabel.includes('no ')) {
                return 'Total number of nozzles on the sprayer';
            } else if (lowerLabel.includes('spacing')) {
                return 'Distance between nozzles';
            } else {
                return 'Component spraying liquid in controlled droplets';
            }
        }

        if (lowerLabel.includes('pressure')) {
            if (lowerLabel.includes('max') || lowerLabel.includes('maximum')) {
                return 'Highest pressure generated by the sprayer pump';
            } else {
                return 'Highest pressure generated by the pump';
            }
        }

        if (lowerLabel.includes('pump')) {
            if (lowerLabel.includes('discharge')) {
                return 'Liquid flow rate from the sprayer pump';
            } else if (lowerLabel.includes('flow')) {
                return 'Rate at which fluid flows through hydraulic system';
            } else if (lowerLabel.includes('water')) {
                return 'Pump to circulate and spray water/liquid';
            } else {
                return 'Pump specification of implement';
            }
        }

        if (lowerLabel.includes('boom')) {
            return 'Length of sprayer boom';
        }

        // Spacing and distance specifications
        if (containsPattern(['spacing', 'अंतर', 'दूरी'])) {
            if (containsPattern(['row', 'पंक्ति', 'रो'])) {
                return 'Distance between seed drill rows';
            } else if (containsPattern(['plant', 'पौधा', 'रोपण'])) {
                return 'Distance between two planted seeds';
            } else if (containsPattern(['hill', 'टीला', 'हिल'])) {
                return 'Distance between planting hills';
            } else if (containsPattern(['shovel', 'शवल', 'फावड़ा'])) {
                return 'Spacing between two shovel (Tyne)';
            } else {
                return 'Distance between components';
            }
        }

        if (containsPattern(['distance', 'दूरी', 'फासला'])) {
            if (containsPattern(['row', 'पंक्ति', 'रो'])) {
                return 'Distance between rows';
            } else if (containsPattern(['plant', 'पौधा', 'रोपण'])) {
                return 'Distance between planted items';
            } else if (containsPattern(['seed', 'बीज', 'सीड'])) {
                return 'Distance between seeds while planting';
            } else if (containsPattern(['ground', 'जमीन', 'भूमि'])) {
                return 'Minimum distance from ground';
            } else {
                return 'Distance specification';
            }
        }

        // Row and hill specifications
        if (lowerLabel.includes('row')) {
            if (lowerLabel.includes('number') || lowerLabel.includes('no ')) {
                if (lowerLabel.includes('plant')) {
                    return 'Total rows of rice planted in one pass';
                } else {
                    return 'Number of rows planted in one pass';
                }
            } else {
                return 'Row specification of implement';
            }
        }

        if (lowerLabel.includes('hill')) {
            if (lowerLabel.includes('number') || lowerLabel.includes('no ')) {
                return 'Total hills planted in one pass';
            } else if (lowerLabel.includes('space')) {
                return 'Distance between planting hills';
            } else {
                return 'Hill specification of implement';
            }
        }

        // Material and construction specifications
        if (lowerLabel.includes('sheet')) {
            if (lowerLabel.includes('bucket')) {
                return translation?.implementDetails?.specTooltips?.bucketSheet || 'Bucket Sheet thickness';
            } else if (lowerLabel.includes('floor')) {
                return 'Metal sheet forming trailer floor dimension';
            } else if (lowerLabel.includes('side')) {
                return 'Sheets forming the trailer\'s side walls';
            } else {
                return 'Sheet material specification';
            }
        }

        if (lowerLabel.includes('thickness')) {
            if (lowerLabel.includes('plate')) {
                return translation?.implementDetails?.specTooltips?.thicknessOfPlate || 'Thickness of the plate for strength';
            } else if (lowerLabel.includes('shovel')) {
                return 'Thickness of the shovel blades';
            } else {
                return 'Thickness specification';
            }
        }

        // Support and mechanical specifications
        if (lowerLabel.includes('support')) {
            if (lowerLabel.includes('side')) {
                return translation?.implementDetails?.specTooltips?.sideSupport || 'Supports on the sides for better stability';
            } else {
                return 'Support specification for stability';
            }
        }

        if (lowerLabel.includes('spring')) {
            if (lowerLabel.includes('leaf')) {
                return 'Suspension absorbing shocks during motion';
            } else {
                return 'Absorbs shock and recovers strength';
            }
        }

        if (lowerLabel.includes('cylinder')) {
            if (lowerLabel.includes('number') || lowerLabel.includes('no ')) {
                return 'Number of cylinders in engine';
            } else {
                return 'Rotating drum for operation';
            }
        }

        // Output and performance specifications
        if (lowerLabel.includes('output')) {
            return 'Performance measured in area covered per hour';
        }

        if (lowerLabel.includes('efficiency')) {
            return 'Performance level of operation';
        }

        if (lowerLabel.includes('clearance')) {
            if (lowerLabel.includes('ground')) {
                return 'Distance between ground and machine base';
            } else {
                return 'Clearance specification';
            }
        }

        // Specific machine components
        if (lowerLabel.includes('chassis')) {
            return 'Structural frame supporting the machine';
        }

        if (lowerLabel.includes('alternator')) {
            return 'Generator that powers the electrical system';
        }

        if (lowerLabel.includes('battery')) {
            return 'Power supply source for the machine';
        }

        if (lowerLabel.includes('displacement')) {
            return 'Volume of engine cylinder for combustion';
        }

        if (lowerLabel.includes('torque')) {
            return 'Rotational force delivered by the engine';
        }

        // Harvester and processing specifications
        if (lowerLabel.includes('thresh')) {
            return 'Mechanism to separate grains from crops';
        }

        if (lowerLabel.includes('knotter')) {
            return 'Number of knotters for binding bales securely';
        }

        if (lowerLabel.includes('bale')) {
            if (lowerLabel.includes('chamber')) {
                return 'Compartment where bales are compressed';
            } else if (lowerLabel.includes('diameter')) {
                return 'Diameter of bales produced by baler';
            } else {
                return 'Bale specification';
            }
        }

        // Seeder and planter specifications
        if (lowerLabel.includes('seedling')) {
            if (lowerLabel.includes('number') || lowerLabel.includes('no ')) {
                return 'Number of rice seedlings planted in each hill';
            } else if (lowerLabel.includes('type')) {
                return 'Type of seedlings used for planting';
            } else if (lowerLabel.includes('height')) {
                return 'Height of seedlings ready for transplanting';
            } else {
                return 'Seedling specification';
            }
        }

        if (lowerLabel.includes('seed')) {
            if (lowerLabel.includes('gap')) {
                return 'Distance between seeds while planting';
            } else if (lowerLabel.includes('mechanism')) {
                return 'Combined system for sowing and fertilizing';
            } else if (lowerLabel.includes('setting')) {
                return 'Facility to maintain proper seed spacing';
            } else {
                return 'Seed specification';
            }
        }

        // Roller and drum specifications
        if (lowerLabel.includes('roller')) {
            if (lowerLabel.includes('press')) {
                return 'Smoothens soil after sowing seeds';
            } else if (lowerLabel.includes('profiled')) {
                return 'Length of rollers for crop compression';
            } else {
                return 'Roller specification';
            }
        }

        if (lowerLabel.includes('drum')) {
            if (lowerLabel.includes('diameter')) {
                return 'Diameter of drum used';
            } else if (lowerLabel.includes('blade')) {
                return 'Total blades installed in the drum';
            } else {
                return 'Drum specification';
            }
        }

        // Warranty and other specifications
        if (containsPattern(['warranty', 'वारंटी', 'गारंटी'])) {
            return translation?.implementDetails?.specTooltips?.warranty || 'Warranty period provided by manufacturer';
        }

        // Output and performance specifications
        if (containsPattern(['output', 'आउटपुट', 'उत्पादन'])) {
            return 'Performance measured in area covered per hour';
        }

        if (containsPattern(['efficiency', 'दक्षता', 'कार्यक्षमता'])) {
            return 'Performance level of operation';
        }

        // Generic but meaningful fallback
        return `${label} specification of implement`;
    };

    const toggleSection = () => {
        setIsOpen(prev => !prev);
    };

    // Create specifications array from implement detail data
    const createSpecifications = () => {
        const specs = [];

        // Basic information with links
        if (implementDetail.brand_name) {
            const brandSlug = implementDetail.brand_slug || implementDetail.brand_name.toLowerCase().replace(/\s+/g, '-');
            specs.push({
                label: translation?.common?.brand || 'Brand',
                value: implementDetail.brand_name,
                isLink: true,
                link: ((currentLang == 'hi' ? '/hi' : '') + implementDetail.brand_url) || `${currentLang === 'hi' ? '/hi' : ''}/tractor-implements/${brandSlug}`
            });
        }

        if (implementDetail.model_name) {
            specs.push({
                label: translation?.common?.model || 'Model',
                value: implementDetail.model_name
            });
        }

        if (implementDetail.category_name) {
            const categorySlug = implementDetail.category_name.toLowerCase().replace(/\s+/g, '-');
            specs.push({
                label: translation?.implementSpecs?.category || 'Category',
                value: implementDetail.category_name,
                isLink: true,
                link: ((currentLang == 'hi' ? '/hi' : '') + implementDetail.category_url) || `${currentLang === 'hi' ? '/hi' : ''}/tractor-implements/category/${categorySlug}`
            });
        }

        // Extract type from implement_type_url if available
        if (implementDetail.implement_type_url) {
            const typeMatch = implementDetail.implement_type_url.match(/\/([^\/]+)$/);
            if (typeMatch) {
                const typeName = typeMatch[1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                specs.push({
                    label: translation?.implementSpecs?.type || 'Type',
                    value: typeName,
                    isLink: true,
                    link: (currentLang == 'hi' ? '/hi' : '') + implementDetail.implement_type_url
                });
            }
        }

        // Physical specifications
        if (implementDetail.Length) {
            specs.push({
                label: translation?.implementSpecs?.length || 'Length',
                value: implementDetail.Length
            });
        }

        if (implementDetail.Height) {
            specs.push({
                label: translation?.implementSpecs?.height || 'Height',
                value: implementDetail.Height
            });
        }

        if (implementDetail.width || implementDetail.Width) {
            specs.push({
                label: translation?.implementSpecs?.width || 'Width',
                value: implementDetail.width || implementDetail.Width
            });
        }

        if (implementDetail.weight) {
            specs.push({
                label: translation?.implementSpecs?.weight || 'Weight',
                value: implementDetail.weight
            });
        }

        // Power specifications
        if (implementDetail.implement_power) {
            specs.push({
                label: translation?.implementSpecs?.powerRequired || 'Power Required',
                value: implementDetail.implement_power + ' ' + (translation?.tractorSpecs?.hp || 'HP')
            });
        } if (implementDetail.tractor_power) {
            specs.push({
                label: translation?.implementSpecs?.tractorPower || 'Tractor Power',
                value: implementDetail.tractor_power
            });
        }

        if (implementDetail.Tractor_Power_hp) {
            specs.push({
                label: translation?.implementSpecs?.tractorPowerHP || 'Tractor Power (HP)',
                value: implementDetail.Tractor_Power_hp + ' ' + (translation?.tractorSpecs?.hp || 'HP')
            });
        }        // Working specifications
        if (implementDetail.working_width) {
            specs.push({
                label: translation?.implementSpecs?.workingWidth || 'Working Width',
                value: implementDetail.working_width
            });
        }

        if (implementDetail.Tillage_width) {
            specs.push({
                label: translation?.implementSpecs?.tillageWidth || 'Tillage Width',
                value: implementDetail.Tillage_width
            });
        }

        if (implementDetail.Width_of_Cut) {
            specs.push({
                label: translation?.implementSpecs?.widthOfCut || 'Width of Cut',
                value: implementDetail.Width_of_Cut
            });
        }

        if (implementDetail.Depth_of_Cut) {
            specs.push({
                label: translation?.implementSpecs?.depthOfCut || 'Depth of Cut',
                value: implementDetail.Depth_of_Cut
            });
        }

        // Disc specifications
        if (implementDetail.Disc_diameter) {
            specs.push({
                label: translation?.implementSpecs?.discDiameter || 'Disc Diameter',
                value: implementDetail.Disc_diameter
            });
        }

        if (implementDetail.Disc_spacing || implementDetail.disc_space) {
            specs.push({
                label: translation?.implementSpecs?.discSpacing || 'Disc Spacing',
                value: implementDetail.Disc_spacing || implementDetail.disc_space
            });
        }

        if (implementDetail.no_of_disc) {
            specs.push({
                label: translation?.implementSpecs?.numberOfDiscs || 'Number of Discs',
                value: implementDetail.no_of_disc
            });
        }

        if (implementDetail.Type_of_disc) {
            specs.push({
                label: translation?.implementSpecs?.typeOfDisc || 'Type of Disc',
                value: implementDetail.Type_of_disc
            });
        }

        // Plough specifications
        if (implementDetail.bodies_number) {
            specs.push({
                label: translation?.implementSpecs?.bodiesNumber || 'Bodies Number',
                value: implementDetail.bodies_number
            });
        }

        if (implementDetail.Furrow) {
            specs.push({
                label: translation?.implementSpecs?.furrow || 'Furrow',
                value: implementDetail.Furrow
            });
        }

        // Other specifications
        if (implementDetail.Blade) {
            specs.push({
                label: translation?.implementSpecs?.blade || 'Blade',
                value: implementDetail.Blade
            });
        }

        if (implementDetail.Tyne) {
            specs.push({
                label: translation?.implementSpecs?.tyne || 'Tyne',
                value: implementDetail.Tyne
            });
        }

        if (implementDetail.Bar_Point) {
            specs.push({
                label: translation?.implementSpecs?.barPoint || 'Bar Point',
                value: implementDetail.Bar_Point
            });
        }

        if (implementDetail.Axle_Type) {
            specs.push({
                label: translation?.implementSpecs?.axleType || 'Axle Type',
                value: implementDetail.Axle_Type
            });
        }

        if (implementDetail.Drawbar_Type) {
            specs.push({
                label: translation?.implementSpecs?.drawbarType || 'Drawbar Type',
                value: implementDetail.Drawbar_Type
            });
        }

        // Add price link if available
        if (implementDetail.road_price_url) {
            specs.push({
                label: translation?.implementSpecs?.price || 'Price',
                value: translation?.implementSpecs?.getImplementPrice || 'Get Implement Price',
                isLink: true,
                link: ((currentLang == 'hi' ? '/hi' : '') + implementDetail.road_price_url)
            });
        }

        return specs.filter(spec =>
            spec.value &&
            spec.value !== 'NA' &&
            spec.value !== 'null' &&
            spec.value !== 'undefined' &&
            String(spec.value).trim() !== ''
        );
    };

    const specifications = createSpecifications();

    // If no specifications available, still show the banner and additional content
    if (specifications.length === 0) {
        return (
            <>
                <div className="relative mt-4 h-full w-full">
                    {/* Show banner if provided */}
                    {bannerDetail && bannerDetail.imgUrl && (
                        <div className="mb-4">
                            <TG_Banner
                                imgUrl={bannerDetail.imgUrl}
                                mobileImgUrl={bannerDetail.imgUrl}
                                imageClasses={bannerDetail.imageClasses || "max-h-[200px]"}
                                unoptimized={bannerDetail.unoptimized}
                            />
                        </div>
                    )}

                    {/* Data last updated section */}
                    <div className="mt-1.5 text-center">
                        <span className="mx-auto text-sm text-gray-main">
                            {translation?.headings?.dataLastUpdatedOn || 'Data last updated on'}:{' '}
                            {currentDate}{' '}
                        </span>
                    </div>

                    {/* Additional banner - only show on desktop */}
                    <div className="mt-4 flex w-full justify-center">
                        <Link
                            href={'https://tractorgyan.com/tractors'}
                            className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
                        >
                            <Image
                                src={
                                    'https://images.tractorgyan.com/uploads/118099/67c1903aa3cb5-Implement-Listing-Banner-Desk.webp'
                                }
                                height={200}
                                width={200}
                                alt={translation?.tractorReview?.allTractorPageBanner || "All Implement Page Banner"}
                                title={translation?.tractorReview?.allTractorPageBanner || "All Implement Page Banner"}
                                className="h-full w-full object-contain object-center"
                            />
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="relative mt-4 h-full w-full">
                {/* Show banner above specs if provided */}
                {bannerDetail && bannerDetail.imgUrl && (
                    <div className="mb-4">
                        <TG_Banner
                            imgUrl={bannerDetail.imgUrl}
                            mobileImgUrl={bannerDetail.imgUrl}
                            imageClasses={bannerDetail.imageClasses || "max-h-[200px]"}
                            unoptimized={bannerDetail.unoptimized}
                        />
                    </div>
                )}

                <div className="sticky bottom-0 top-0">
                    {/* Main heading outside of cards */}
                    <div className="mb-6 hidden md:block">
                        <h2 className="border-b-3 inline-block border-secondary pb-2 text-lg font-semibold leading-6">
                            {`${implementDetail.brand_name} ${implementDetail.model_name} ${translation?.implementDetails?.technicalSpecifications || 'Technical Specifications'}`}
                        </h2>
                    </div>

                    {/* Mobile heading */}
                    <div className="mb-6 block md:hidden">
                        <h2 className="border-b-3 inline-block border-secondary pb-2 text-lg font-semibold leading-6">
                            {`${implementDetail.brand_name} ${implementDetail.model_name} ${translation?.implementDetails?.technicalSpecifications || 'Technical Specifications'}`}
                        </h2>
                        <p className="text-sm">
                            {translation?.implementSpecs?.detailedDescription ||
                                'Detailed technical specifications and features of the'}{' '}
                            {implementDetail.brand_name} {implementDetail.model_name}{' '}
                            {translation?.common?.implement || 'implement'}.
                        </p>
                    </div>

                    {/* Specification card */}
                    <div className="mb-4">
                        <div
                            className={`${!isOpen && 'rounded-b-lg'
                                } flex cursor-pointer items-center justify-between gap-3 rounded-t-lg bg-primary p-4 text-base font-semibold leading-[18px] text-white shadow-main`}
                            onClick={toggleSection}
                        >
                            <h3>{`${implementDetail.brand_name} ${implementDetail.model_name} ${translation?.implementDetails?.features || 'Features'}`}</h3>
                            <button>
                                <Image
                                    src={`${isOpen
                                        ? 'https://images.tractorgyan.com/uploads/114119/66a8b1e63149d-upArrowFeature.png'
                                        : 'https://images.tractorgyan.com/uploads/114118/66a8b19bd6d66-featureTableDown.png'
                                        }`}
                                    height={20}
                                    width={20}
                                    alt="toggle-button-image"
                                    title="toggle-button-image"
                                    className="h-5 w-full min-w-5 max-w-5"
                                />
                            </button>
                        </div>
                        {isOpen && (
                            <ul className="rounded-b-lg bg-white p-2 shadow-main">
                                {specifications.map((spec, index) => (
                                    <li
                                        key={index}
                                        className={`flex gap-10 px-2 py-[13px] ${index !== specifications.length - 1 ? 'border-b-[1px] border-gray-light' : ''
                                            }`}
                                    >
                                        <div className="flex w-1/2 items-center justify-between">
                                            <span className="text-xs font-normal text-gray-dark">{spec.label}</span>
                                            <div className="">
                                                <Tooltip content={getTooltipContent(spec.label)}>
                                                    <Image
                                                        src="https://images.tractorgyan.com/uploads/114120/66a8b8690664c-informationTableIcon.png"
                                                        height={15}
                                                        width={15}
                                                        alt="information-icon"
                                                        title="information-icon"
                                                        className="h-[15px] w-full min-w-[15px] max-w-[15px]"
                                                    />
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            {spec.isLink ? (
                                                <Link
                                                    href={spec.link}
                                                    className="text-sm font-medium text-primary hover:text-primary-dark underline"
                                                >
                                                    {spec.value}
                                                </Link>
                                            ) : (
                                                <span className="text-sm font-medium text-black break-words">
                                                    {spec.value}
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Data last updated section */}
                    <div className="mt-1.5 text-center">
                        <span className="mx-auto text-sm text-gray-main">
                            {translation?.headings?.dataLastUpdatedOn || 'Data last updated on'}:{' '}
                            {currentDate}{' '}
                        </span>
                    </div>

                    {/* Additional banner - only show on desktop */}
                    {/* <div className="mt-4 flex w-full justify-center">
            <Link
              href={'https://tractorgyan.com/tractors'} 
              className="hidden h-full max-h-[526px] w-full max-w-[270px] overflow-hidden rounded-2xl lg:block"
            >
              <Image
                src={
                  'https://images.tractorgyan.com/uploads/118099/67c1903aa3cb5-Implement-Listing-Banner-Desk.webp'
                }
                height={200}
                width={200}
                alt={translation?.tractorReview?.allImplementPageBanner || "All Implement Page Banner"}
                title={translation?.tractorReview?.allImplementPageBanner || "All Implement Page Banner"} 
                className="h-full w-full object-contain object-center"
              />
            </Link>
          </div> */}
                </div>
            </div>
        </>
    );
};

export default ImplementDetailsSpecs;
