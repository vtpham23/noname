import { lib, game, ui, get, ai, _status } from "noname";

const dynamicTranslates = {
  mbkechang(player, skill) {
    if (player.getStorage(skill, false)) {
      return lib.translate[`${skill}_rewrite_info`];
    }
    return lib.translate[`${skill}_info`];
  },
  potkuanggu(player) {
    if (player.getStorage("potkuanggu", 0)) {
      return lib.translate["potkuanggu_pot_weiyan_achieve_info"];
    }
    return lib.translate["potkuanggu_info"];
  },
  pothanzhan(player) {
    let str = lib.translate.pothanzhan_info;
    if (!player.storage.pothanzhan) {
      return str;
    }
    return str.replace(
      "X là giới hạn thể lực mỗi bên",
      "X là " + {
        hp: "trị số thể lực mỗi bên",
        damagedHp: "trị số thể lực đã mất mỗi bên",
        countplayer: "số lượng nhân vật còn sống trên sân"
      }[player.storage.pothanzhan]
    );
  },
  potzhanlie(player) {
    let str = lib.translate.potzhanlie_info;
    if (!player.storage.potzhanlie) {
      return str;
    }
    return str.replace(
      "X là tầm tấn công của bạn",
      "X là " + {
        hp: "trị số thể lực của bạn",
        damagedHp: "trị số thể lực đã mất của bạn",
        countplayer: "số lượng nhân vật còn sống trên sân"
      }[player.storage.potzhanlie]
    );
  }
};
export default dynamicTranslates;
