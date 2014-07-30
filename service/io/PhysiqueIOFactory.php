<?php

/**
 * Description of PhysiqueIOFactory
 *
 * @author Damien Chesneau <contact@damienchesneau.fr>
 */
include_once $path . 'service/io/strings/StringsServiceIOImpl.php';

class PhysiqueIOFactory {

    private static $stringsSrv = null;
    /**
     * 
     * @return StringsServiceIO
     */
    public static function getStringsService() {
        if (PhysiqueIOFactory::$stringsSrv == null) {
            PhysiqueIOFactory::$stringsSrv = new StringsServiceIOImpl();
        }
        return PhysiqueIOFactory::$stringsSrv;
    }

}
